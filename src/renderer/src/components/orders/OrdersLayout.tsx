import { ORDERS_LAYOUT } from "@renderer/config/layout";
import CategoriesPanel from "./CategoriesPanel";
import MenuGrid from "./MenuGrid";
import OrderSummary from "./OrderSummary";
import { MenuItem } from "@renderer/types/menu";
import { PaymentMethod } from "@renderer/types/payment";
import { OrderItem } from "@renderer/types/order";
import type { CategoryDto } from "src/shared/category";
import type { MenuItemDto } from "src/shared/menu";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

interface OrdersLayoutProps {
    selectedCategory: string;
    onCategorySelect: (categoryId: string) => void;
    orderItems: OrderItem[];
    onIncreaseQuantity: (item: MenuItem) => void;
    onDecreaseQuantity: (itemId: string) => void;
    paymentMethod: PaymentMethod;
    onPaymentMethodChange: (payment: PaymentMethod) => void;
    cashReceived: number | null;
    onCashReceivedChange: (value: number | null) => void;
    splitCash: number | null;
    onSplitCashChange: (value: number | null) => void;
    splitUpi: number | null;
    onSplitUpiChange: (value: number | null) => void;
    onCompleteOrder: () => void;
    isPaymentValid: boolean;
    categories: CategoryDto[];
    menuItems: MenuItemDto[];
    printReceipt: boolean;
    onPrintReceiptChange: (checked: boolean) => void;
    isCompletingOrder: boolean;
    onIncreaseOrderItemQuantity: (item: OrderItem) => void;
    onDecreaseOrderItemQuantity: (item: OrderItem) => void;
    onEditOrderItem: (item: OrderItem) => void;
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    discountType: "fixed" | "percentage" | null;
    discountValue: number;
    onDiscountTypeChange: (type: "fixed" | "percentage" | null) => void;
    onDiscountValueChange: (value: number) => void;
}

function OrdersLayout({ 
    selectedCategory, 
    onCategorySelect, 
    orderItems, 
    onIncreaseQuantity, 
    onDecreaseQuantity,
    paymentMethod,
    onPaymentMethodChange,
    cashReceived,
    onCashReceivedChange,
    splitCash,
    onSplitCashChange,
    splitUpi,
    onSplitUpiChange,
    onCompleteOrder,
    isPaymentValid,
    categories,
    menuItems,
    printReceipt,
    onPrintReceiptChange,
    isCompletingOrder,
    onIncreaseOrderItemQuantity,
    onDecreaseOrderItemQuantity,
    onEditOrderItem,
    searchQuery,
    onSearchQueryChange,
    discountType,
    discountValue,
    onDiscountTypeChange,
    onDiscountValueChange
}: OrdersLayoutProps) {

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);

    return (
        <div className="grid h-full gap-6"
            style={{ gridTemplateColumns: `${ORDERS_LAYOUT.CONTROL_PANEL_WIDTH}px 1fr ${ORDERS_LAYOUT.ORDER_PANEL_WIDTH}px`, }}
        >

            <section className="rounded-2xl bg-(--surface) p-5 shadow-sm">
                <CategoriesPanel 
                    selectedCategory={selectedCategory}
                    onCategorySelect={onCategorySelect} 
                    categories={categories}   
                />
            </section>

            <section className="flex min-h-0 flex-col rounded-2xl bg-(--surface) p-5 shadow-sm">
                <div className="sticky top-0 z-10 mb-3 border-border bg-(--surface) pb-3">
                    <h2 className="mb-2 text-lg font-semibold">
                        Menu
                    </h2>

                    <div className="mb-5">
                        <div className="mt-2 h-px bg-border" />
                    </div>
                    
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                        />

                        <Input
                            className="h-10 rounded-none border-0 border-b border-border bg-gray-100 px-0 pl-10 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Search drinks..."
                            value={searchQuery}
                            onChange={(event) =>
                                onSearchQueryChange(event.target.value)
                            }
                            ref={searchInputRef}
                        />
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                    <MenuGrid 
                        categoryId={selectedCategory}
                        orderItems={orderItems}
                        menuItems={menuItems}
                        onIncreaseQuantity={onIncreaseQuantity}
                        onDecreaseQuantity={onDecreaseQuantity}
                        searchQuery={searchQuery}
                    />
                </div>
            </section>

            <section className="rounded-2xl bg-(--surface) p-5 shadow-sm">
                <OrderSummary 
                    items={orderItems}
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={onPaymentMethodChange}
                    cashReceived={cashReceived}
                    onCashReceivedChange={onCashReceivedChange}
                    splitCash={splitCash}
                    onSplitCashChange={onSplitCashChange}
                    splitUpi={splitUpi}
                    onSplitUpiChange={onSplitUpiChange}
                    onCompleteOrder={onCompleteOrder}
                    isPaymentValid={isPaymentValid}
                    printReceipt={printReceipt}
                    onPrintReceiptChange={onPrintReceiptChange}
                    isCompletingOrder={isCompletingOrder}
                    onIncreaseQuantity={onIncreaseOrderItemQuantity}
                    onDecreaseQuantity={onDecreaseOrderItemQuantity}
                    onEditItem={onEditOrderItem}
                    discountType={discountType}
                    discountValue={discountValue}
                    onDiscountTypeChange={onDiscountTypeChange}
                    onDiscountValueChange={onDiscountValueChange}
                />
            </section>

        </div>
    );
}

export default OrdersLayout;