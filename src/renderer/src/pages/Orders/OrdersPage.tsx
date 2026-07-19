/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-fallthrough */
import PageHeader from "@renderer/components/shared/PageHeader";
import OrdersLayout from "@renderer/components/orders/OrdersLayout";
import CustomizeDrinkDialog from "@renderer/components/orders/CustomizeDrinkDialog";
import { useState } from "react";
import { useMenu } from "@renderer/hooks/useMenu";
import { MenuItem, MenuAddon } from "@renderer/types/menu";
import { PaymentMethod } from "@renderer/types/payment";
import { areAddonsEqual, formatNotes, normalizeNotes } from "@renderer/utils/order";
import { calculateBillingSummary } from "@renderer/utils/billing";
import { isSplitPaymentValid } from "@renderer/utils/payment";
import { OrderItem } from "@renderer/types/order";
import { orderService } from "@renderer/services/orderService";
import { mapCompletedOrder } from "@renderer/mappers/orderMapper";
import { receiptService } from "@renderer/services/receiptService";
import { toast } from "sonner";

function OrdersPage() {
    const { categories, menuItems, selectedCategory, setSelectedCategory } = useMenu();
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
    const [isCustomizeDialogOpen, setCustomizeDialogOpen] = useState(false);
    const [cashReceived, setCashReceived] = useState<number | null>(null);
    const [splitCash, setSplitCash] = useState<number | null>(null);
    const [splitUpi, setSplitUpi] = useState<number | null>(null);
    const [printReceipt, setPrintReceipt] = useState(true);
    const [isCompletingOrder, setIsCompletingOrder] = useState(false);

    function handleIncreaseQuantity(menuItem: MenuItem) {
        console.log(Object.keys(menuItem));
        console.log(menuItem.addOns);
        console.log((menuItem as any).addons);
        if (menuItem.addOns.length > 0) {
            setSelectedMenuItem(menuItem);
            setCustomizeDialogOpen(true);
            return;
        }

        setOrderItems((previous) => {
            const existing = previous.find(
                (item) => 
                    item.menuItem.id === menuItem.id &&
                    item.selectedAddons.length === 0 &&
                    item.notes === ""
            );

            if (existing) {
                return previous.map((item) =>
                    item.menuItem.id === menuItem.id &&
                    item.selectedAddons.length === 0 &&
                    item.notes === ""
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
                );
            }

            return [
                ...previous,
                {
                    menuItem,
                    quantity: 1,
                    selectedAddons: [],
                    notes: "",
                    normalizedNotes: "",
                },
            ];
        });
    }

    function handleDecreaseQuantity(itemId: string) {
        setOrderItems(pre => 
            pre.map(item =>
                item.menuItem.id === itemId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                }
                : item
            )
            .filter(item => item.quantity > 0)
        );
    }

    function handleAddCustomizedItem(addons: MenuAddon[], notes: string) {
        if (!selectedMenuItem) return;

        const normalizedNotes = normalizeNotes(notes);

        setOrderItems(previous => {
            const existing = previous.find(item =>
                item.menuItem.id === selectedMenuItem.id &&

                areAddonsEqual(
                    item.selectedAddons,
                    addons,
                ) && item.notes === normalizedNotes
            );

            if (existing) {
                return previous.map(item =>
                    item === existing
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...previous,
                {
                    menuItem: selectedMenuItem,
                    quantity: 1,
                    selectedAddons: addons,
                    notes: formatNotes(notes),
                    normalizedNotes,
                },
            ];
        });
    }

    const billing = calculateBillingSummary(orderItems);

    const isPaymentValid = (() => {

        switch (paymentMethod) {
            case "cash":
                return (
                    cashReceived !== null &&
                    cashReceived >= billing.grandTotal
                );

            case "card":

            case "upi":

            case "due":
                return true;

            case "split":
                return isSplitPaymentValid(
                    billing.grandTotal,
                    splitCash,
                    splitUpi,
                );

            default:
                return false;
        }

    })();

    async function handleCompleteOrder() {
        if (!isPaymentValid || isCompletingOrder) {
            return;
        }

        setIsCompletingOrder(true);

        try {
            const completedOrder = mapCompletedOrder(
                orderItems,
                billing,
                paymentMethod,
            );

            const orderId = await orderService.saveOrder(completedOrder);

            try {
                if (printReceipt) {
                    await receiptService.print(orderId);
                }
            } catch (error) {
                console.error(error);
                
                toast.error(
                    "Order saved successfully, but the receipt could not be printed."
                );
            }

            // Reset state
            setOrderItems([]);
            setPaymentMethod("cash");
            setCashReceived(null);
            setSplitCash(null);
            setSplitUpi(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsCompletingOrder(false);
        }
    }

    return (
        <div className="flex h-full flex-col">
            <PageHeader title="Orders" description="Take customer orders" />
            <div className="min-h-0 flex-1">
                <OrdersLayout 
                    selectedCategory={selectedCategory} 
                    onCategorySelect={setSelectedCategory}
                    orderItems={orderItems}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                    cashReceived={cashReceived}
                    onCashReceivedChange={setCashReceived}
                    splitCash={splitCash}
                    onSplitCashChange={setSplitCash}
                    splitUpi={splitUpi}
                    onSplitUpiChange={setSplitUpi}
                    onCompleteOrder={handleCompleteOrder}
                    isPaymentValid={isPaymentValid}
                    categories={categories}
                    menuItems={menuItems}
                    printReceipt={printReceipt}
                    onPrintReceiptChange={setPrintReceipt}
                    isCompletingOrder={isCompletingOrder}
                />

                <CustomizeDrinkDialog
                    item={selectedMenuItem}
                    open={isCustomizeDialogOpen}
                    onOpenChange={setCustomizeDialogOpen}
                    onConfirm={handleAddCustomizedItem}
                />
            </div>
        </div>
    );
}

export default OrdersPage;