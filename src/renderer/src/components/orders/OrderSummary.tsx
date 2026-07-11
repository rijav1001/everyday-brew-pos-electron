import EmptyState from "@renderer/components/shared/EmptyState";

import OrderItemCard from "./OrderItemCard";

import type { OrderItem } from "@renderer/types/order";
import { PaymentMethod } from "@renderer/types/payment";
import PaymentSelector from "./PaymentSelector";
import { Button } from "../ui/button";
import { calculateBillingSummary } from "@renderer/utils/billing";
import CashPayment from "./CashPayment";
import SplitPayment from "./SplitPayment";

interface OrderSummaryProps {
    items: OrderItem[];
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

function OrderSummary({ 
    items, 
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
}: OrderSummaryProps) {
    const billing = calculateBillingSummary(items)

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex h-full flex-col">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Order Summary
                </h2>

                <div className="rounded-full bg-background px-3 py-1 text-xs font-medium text-(--text-secondary)">
                    {totalItems} Items
                </div>

                <div className="mt-2 h-px bg-border" />
            </div>

            {items.length === 0 ? (
                <EmptyState
                    title="No items"
                    description="Select a drink to begin."
                />
            ) : (
                <>
                    <div className="flex-1 space-y-3">
                        {items.map(item => (
                            <OrderItemCard
                                key={item.menuItem.id}
                                item={item}
                            />
                        ))}
                    </div>

                    <div className="mt-5 border-t pt-5">
                        {/* Billing Summary */}
                        <div className="space-y-2">

                            <div className="flex items-center justify-between">
                                <span className="font-medium">
                                    Amount
                                </span>

                                <span className="font-medium">
                                    ₹{billing.subtotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-(--text-secondary)">
                                <span>
                                    Taxable Amount
                                </span>

                                <span>
                                    ₹{billing.taxableAmount.toFixed(2)}
                                </span>
                            </div>

                            <div className="pt-1 text-xs text-(--text-secondary)">
                                Net Total (Inclusive of GST)
                            </div>

                            <div className="flex items-center justify-between text-sm text-(--text-secondary)">
                                <span>
                                    CGST @2.5%
                                </span>

                                <span>
                                    ₹{billing.cgst.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-(--text-secondary)">
                                <span>
                                    SGST @2.5%
                                </span>

                                <span>
                                    ₹{billing.sgst.toFixed(2)}
                                </span>
                            </div>

                            {billing.roundOff !== 0 && (
                                <div className="flex items-center justify-between text-sm text-(--text-secondary)">
                                    <span>
                                        Round Off
                                    </span>

                                    <span>
                                        {billing.roundOff > 0 ? "+" : ""}
                                        ₹{billing.roundOff.toFixed(2)}
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* Grand Total */}
                        <div className="mt-4 border-t pt-4">

                            <div className="flex items-center justify-between">

                                <span className="text-lg font-semibold">
                                    Grand Total
                                </span>

                                <span className="text-2xl font-bold">
                                    ₹{billing.grandTotal.toFixed(2)}
                                </span>

                            </div>

                        </div>

                        {/* Payment */}
                        <div className="mt-6 border-t pt-5">

                            <h3 className="mb-3 text-sm font-semibold text-(--text-primary)">
                                Payment Method
                            </h3>

                            <PaymentSelector
                                paymentMethod={paymentMethod}
                                onPaymentMethodChange={onPaymentMethodChange}
                            />

                            {paymentMethod === "cash" && (
                                <CashPayment 
                                    grandTotal={billing.grandTotal}
                                    received={cashReceived}
                                    onChange={onCashReceivedChange}
                                />
                            )}

                            {paymentMethod === "split" && (
                                <SplitPayment 
                                    grandTotal={billing.grandTotal}
                                    cash={splitCash}
                                    upi={splitUpi}
                                    onCashChange={onSplitCashChange}
                                    onUpiChange={onSplitUpiChange}
                                />
                            )}

                        </div>

                        {/* Complete Order */}
                        <Button
                            className="mt-6 w-full cursor-pointer"
                            disabled={!items.length || !isPaymentValid}
                            onClick={onCompleteOrder}
                        >
                            Complete Order
                        </Button>
                    </div>
                </>
            )}

        </div>
    );
}

export default OrderSummary;