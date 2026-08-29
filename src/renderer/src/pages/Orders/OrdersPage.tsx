/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
 /* eslint-disable no-fallthrough */
import PageHeader from "@renderer/components/shared/PageHeader";
import OrdersLayout from "@renderer/components/orders/OrdersLayout";
import CustomizeDrinkDialog from "@renderer/components/orders/CustomizeDrinkDialog";
import { useEffect, useState } from "react";
import { useMenu } from "@renderer/hooks/useMenu";
import { MenuItem, MenuAddon } from "@renderer/types/menu";
import { PaymentMethod } from "@renderer/types/payment";
import { calculateBillingSummary } from "@renderer/utils/billing";
import { isSplitPaymentValid } from "@renderer/utils/payment";
import { OrderItem } from "@renderer/types/order";
import { orderService } from "@renderer/services/orderService";
import { mapCompletedOrder, mapOrderItem, mapOrderItemDto } from "@renderer/mappers/orderMapper";
import { receiptService } from "@renderer/services/receiptService";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { formatNotes } from "../../../../shared/utils/orderUtils";

function OrdersPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { categories, menuItems, selectedCategory, setSelectedCategory } = useMenu();
    const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
    const [isCustomizeDialogOpen, setCustomizeDialogOpen] = useState(false);
    const [cashReceived, setCashReceived] = useState<number | null>(null);
    const [splitCash, setSplitCash] = useState<number | null>(null);
    const [splitUpi, setSplitUpi] = useState<number | null>(null);
    const [printReceipt, setPrintReceipt] = useState(true);
    const [isCompletingOrder, setIsCompletingOrder] = useState(false);
    const [editingOrderItem, setEditingOrderItem] = useState<OrderItem | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [discountType, setDiscountType] = useState<"fixed" | "percentage" | null>(null);
    const [discountValue, setDiscountValue] = useState(0);

    async function loadOrder(orderId: string) {
        const details = await orderService.getDetails(orderId);
        if (menuItems.length === 0) {
            return;
        }

        setOrderItems(details.items.map(item => mapOrderItem(item, menuItems)));
    }

    useEffect(() => {
        const orderId = location.state?.orderId as string | undefined;

        if (!orderId) {
            return;
        }

        setActiveOrderId(orderId);
        loadOrder(orderId);
    }, [location.state, menuItems]);

    async function addMenuItemToOrder(orderId: string, menuItem: MenuItem) {
        const existing = orderItems.find(item => 
            item.menuItem.name === menuItem.name && 
            item.selectedAddons.length === 0 &&
            item.normalizedNotes === ""
        );

        if (menuItem.addOns.length > 0) {
            setSelectedMenuItem(menuItem);
            setCustomizeDialogOpen(true);
            return;
        }

        if (existing) {
            await orderService.updateItem(
                existing.id!,
                mapOrderItemDto({
                    ...existing,
                    quantity: existing.quantity + 1,
                }),
            );
        } else {
            await orderService.addItem(
                orderId,
                {
                    menuItemName: menuItem.name,
                    unitPrice: menuItem.displayPrice,
                    gstRate: menuItem.gstRate,
                    quantity: 1,
                    notes: "",
                    addons: [],
                },
            );
        }

        await loadOrder(orderId);
    }

    async function handleIncreaseQuantity(menuItem: MenuItem) {
        const orderId = activeOrderId;

        if (!orderId) {
            return;
        }
        
        await addMenuItemToOrder(orderId, menuItem);
    }

    async function handleDecreaseQuantity(itemId: string) {
        if (!activeOrderId) {
            toast.error("No active order. Please create an order first.");
            return;
        }

        const item = orderItems.find(item => item.menuItem.id === itemId);

        if (!item || !item.id) {
            return;
        }

        if (item.quantity > 1) {
            await orderService.updateItem(
                item.id,
                mapOrderItemDto({
                    ...item,
                    quantity: item.quantity - 1,
                }),
            );
        } else {
            await orderService.removeItem(item.id);
        }

        await loadOrder(activeOrderId);
    }

    async function handleAddCustomizedItem(addons: MenuAddon[], notes: string) {
        if (!selectedMenuItem || !activeOrderId) return;

        if (editingOrderItem) {
            await orderService.updateItem(
                editingOrderItem.id!,
                {
                    ...mapOrderItemDto(editingOrderItem),
                    notes: formatNotes(notes),
                    addons: addons.map(addon => ({
                        name: addon.name,
                        price: addon.price,
                    })),
                },
            );
        } else {
            await orderService.addItem(
                activeOrderId,
                {
                    menuItemName: selectedMenuItem.name,
                    unitPrice: selectedMenuItem.displayPrice,
                    gstRate: selectedMenuItem.gstRate,
                    quantity: 1,
                    notes: formatNotes(notes),
                    addons: addons.map(addon => ({
                        name: addon.name,
                        price: addon.price,
                    })),
                },
            );
        }

        // setEditingOrderItem(null);
        await loadOrder(activeOrderId);
    }

    const billing = calculateBillingSummary(orderItems, discountType, discountValue); // Temporary

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

            await orderService.completeOrder(activeOrderId!, completedOrder);

            if (printReceipt) {
                try {
                    if (printReceipt) {
                        await receiptService.print(activeOrderId!);

                        toast.success("Order completed and receipt printed.");
                    }
                } catch (error) {
                    console.error(error);
                    
                    toast.error("Order saved successfully, but the receipt could not be printed.");
                }
            } else {
                toast.success("Order completed successfully.");
            }

            // Reset state
            setOrderItems([]);
            setActiveOrderId(null);
            setPaymentMethod("cash");
            setDiscountType(null);
            setDiscountValue(0);
            setCashReceived(null);
            setSplitCash(null);
            setSplitUpi(null);

            navigate("/active-orders");
        } catch (error) {
            console.error(error);
        } finally {
            setIsCompletingOrder(false);
        }
    }

    async function handleIncreaseOrderItemQuantity(item: OrderItem) {
        if (!activeOrderId) {
            return;
        }

        await orderService.updateItem(
            item.id!,
            mapOrderItemDto({
                ...item,
                quantity: item.quantity + 1,
            }),
        );

        await loadOrder(activeOrderId);
    }

    async function handleDecreaseOrderItemQuantity(item: OrderItem) {
        if (!activeOrderId) {
            return;
        }

        if (item.quantity > 1) {
            await orderService.updateItem(
                item.id!,
                mapOrderItemDto({
                    ...item,
                    quantity: item.quantity - 1,
                }),
            );
        } else {
            await orderService.removeItem(item.id!);
        }

        await loadOrder(activeOrderId);
    }

    function handleEditOrderItem(item: OrderItem) {
        setEditingOrderItem(item);
        setSelectedMenuItem(item.menuItem);
        setCustomizeDialogOpen(true);
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
                    onIncreaseOrderItemQuantity={handleIncreaseOrderItemQuantity}
                    onDecreaseOrderItemQuantity={handleDecreaseOrderItemQuantity}
                    onEditOrderItem={handleEditOrderItem}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    discountType={discountType}
                    discountValue={discountValue}
                    onDiscountTypeChange={setDiscountType}
                    onDiscountValueChange={setDiscountValue}
                />

                <CustomizeDrinkDialog
                    item={selectedMenuItem}
                    open={isCustomizeDialogOpen}
                    onOpenChange={(open) => {
                        setCustomizeDialogOpen(open);

                        if (!open) {
                            setEditingOrderItem(null);
                        }
                    }}
                    onConfirm={handleAddCustomizedItem}
                    editingItem={editingOrderItem}
                />

            </div>
        </div>
    );
}

export default OrdersPage;