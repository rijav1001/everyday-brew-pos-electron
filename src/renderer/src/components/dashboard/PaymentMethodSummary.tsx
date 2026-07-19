import { CreditCard, Smartphone, Wallet, ReceiptIndianRupee } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { PaymentMethodSummaryDto } from "src/shared/dashboard";

interface PaymentMethodSummaryProps {
    paymentSummary: PaymentMethodSummaryDto[];
}

function getPaymentMethodIcon(paymentMethod: string) {
    switch (paymentMethod) {
        case "cash":
            return <Wallet className="h-5 w-5" />;

        case "upi":
            return <Smartphone className="h-5 w-5" />;

        case "card":
            return <CreditCard className="h-5 w-5" />;

        default:
            return <ReceiptIndianRupee className="h-5 w-5" />;
    }
}

export function PaymentMethodSummary({
    paymentSummary,
}: PaymentMethodSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Payment Methods Today
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {paymentSummary.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No orders today.
                    </p>
                ) : (
                    paymentSummary.map((payment) => (
                        <div
                            key={payment.paymentMethod}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                {getPaymentMethodIcon(payment.paymentMethod)}

                                <div>
                                    <p className="font-medium capitalize">
                                        {payment.paymentMethod}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {payment.orderCount} orders
                                    </p>
                                </div>
                            </div>

                            <p className="text-lg font-semibold">
                                ₹{payment.totalAmount.toFixed(2)}
                            </p>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}