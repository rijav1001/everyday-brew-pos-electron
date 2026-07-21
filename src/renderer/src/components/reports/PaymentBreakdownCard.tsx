import { PaymentBreakdownDto } from "src/shared/report";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface PaymentBreakdownCardProps {
    data: PaymentBreakdownDto[];
}

function PaymentBreakdownCard({
    data,
}: PaymentBreakdownCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Payment Breakdown
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {data.length === 0 ? (
                    <div className="flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                            No payment records found.
                        </p>
                    </div>

                ) : (
                    data.map((item) => (

                        <div
                            key={item.paymentMethod}
                            className="flex justify-between"
                        >

                            <span>
                                {item.paymentMethod}
                            </span>

                            <span>
                                ₹{item.total.toFixed(2)}
                            </span>

                        </div>

                    ))
                )}

            </CardContent>
        </Card>
    );
}

export default PaymentBreakdownCard;