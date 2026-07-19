import { Receipt } from "lucide-react";

import { RecentOrderDto } from "src/shared/dashboard";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface RecentOrdersProps {
    orders: RecentOrderDto[];
}

function RecentOrders({
    orders,
}: RecentOrdersProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recent Orders
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No recent orders.
                    </p>
                ) : (
                    orders.map(order => (
                        <div
                            key={order.id}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">

                                <Receipt className="h-4 w-4 text-muted-foreground"/>

                                <div>
                                    <p className="font-medium">
                                        #{order.billNumber}
                                    </p>

                                    <p className="text-xs text-muted-foreground capitalize">
                                        {order.paymentMethod}
                                    </p>
                                </div>

                            </div>

                            <p className="font-semibold">
                                ₹{order.grandTotal.toFixed(2)}
                            </p>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}

export default RecentOrders;