import { useOrderHistory } from "@renderer/hooks/useOrderHistory";
import { useState } from "react";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrderHistoryPage() {
    const { orders, loading, selectedOrder, loadOrderDetails } = useOrderHistory();
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    
    return (
        <div className="space-y-4">

            <div className="mb-6 flex items-center gap-2">
                <ArrowLeft 
                    className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => navigate("/reports")}
                />

                <h1 className="text-2xl font-semibold">
                    Order History
                </h1>
            </div>

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