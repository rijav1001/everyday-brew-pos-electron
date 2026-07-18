import { useOrderHistory } from "@renderer/hooks/useOrderHistory";
import { useState } from "react";
import OrderDetailsDialog from "./OrderDetailsDialog";

function OrderHistoryPage() {
    const { orders, loading, selectedOrder, loadOrderDetails } = useOrderHistory();
    const [dialogOpen, setDialogOpen] = useState(false);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    
    return (
        <div className="space-y-4">

            <h1 className="text-2xl font-semibold">
                Order History
            </h1>

            {orders.map(order => (
                <div
                    key={order.id}
                    className="cursor-pointer rounded-xl border p-4 transition-colors hover:bg-accent"
                    onClick={async () => {
                        await loadOrderDetails(order.id);
                        setDialogOpen(true);
                    }}
                >

                    <div className="flex justify-between">

                        <div>

                            <p className="font-medium">
                                {order.billNumber}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {new Date(order.completedAt)
                                    .toLocaleString()}
                            </p>

                        </div>

                        <div className="text-right">

                            <p className="font-semibold">
                                ₹{order.grandTotal.toFixed(2)}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {order.paymentMethod.toUpperCase()}
                            </p>

                        </div>

                    </div>

                </div>
            ))}

            <OrderDetailsDialog
                order={selectedOrder}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />

        </div>
    );
}

export default OrderHistoryPage;