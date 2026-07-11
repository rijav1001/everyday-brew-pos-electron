import { ORDERS_LAYOUT } from "@renderer/config/layout";
import CategoriesPanel from "./CategoriesPanel";
import MenuGrid from "./MenuGrid";
import OrderSummary from "./OrderSummary";
import { MenuItem } from "@renderer/types/menu";
import { PaymentMethod } from "@renderer/types/payment";
import { OrderItem } from "@renderer/types/order";

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
    isPaymentValid
}: OrdersLayoutProps) {
    return (
        <div className="grid h-full gap-6"
            style={{ gridTemplateColumns: `${ORDERS_LAYOUT.CONTROL_PANEL_WIDTH}px 1fr ${ORDERS_LAYOUT.ORDER_PANEL_WIDTH}px`, }}
        >

            <section className="rounded-2xl bg-(--surface) p-5 shadow-sm">
                <CategoriesPanel 
                    selectedCategory={selectedCategory}
                    onCategorySelect={onCategorySelect}    
                />
            </section>

            <section className="rounded-2xl bg-(--surface) p-5 shadow-sm">
                <MenuGrid 
                    categoryId={selectedCategory}
                    orderItems={orderItems}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                />
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
                />
            </section>

        </div>
    );
}

export default OrdersLayout;