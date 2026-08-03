
import { OrderHistoryItemDto } from "src/shared/orderHistory";
import { OrderType } from "../../../../shared/enums";
import { Button } from "../ui/button";
import { useState } from "react";
import { Ban } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Textarea } from "../ui/textarea";

interface ActiveOrdersPanelProps {
    orders: OrderHistoryItemDto[];
    activeOrderId: string | null;
    onSelectOrder: (orderId: string) => void;
    onCreateOrder: () => void;
    onCancelOrder: (orderId: string, cancelReason: string | null) => void;
}

function ActiveOrdersPanel({
    orders,
    activeOrderId,
    onSelectOrder,
    onCreateOrder,
    onCancelOrder
}: ActiveOrdersPanelProps) {

    const [orderToCancel, setOrderToCancel] = useState<OrderHistoryItemDto | null>(null);
    const [cancelReason, setCancelReason] = useState("");
    return (
        <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Active Orders
                </h2>

                <Button
                    className="w-auto cursor-pointer"
                    onClick={onCreateOrder}
                >
                    + New Order
                </Button>

                <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-(--text-secondary)">
                    {orders.length}
                </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
                {orders.map(order => (
                    <div
                        key={order.id}
                        onClick={() => onSelectOrder(order.id)}
                        className={`w-full rounded-xl border p-4 text-left transition cursor-pointer ${
                            activeOrderId === order.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/40"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-semibold">
                                    {order.billNumber}
                                </span>

                                <div className="mt-0.5 text-sm text-(--text-secondary)">
                                    {order.orderType === OrderType.DINE_IN
                                        ? `Table ${order.tableNumber}`
                                        : "Takeaway"}
                                </div>
                            </div>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOrderToCancel(order);
                                }}
                            >
                                <Ban size={16} />
                            </Button>
                        </div>

                        <span className="text-sm text-(--text-secondary)">
                            ₹{order.grandTotal.toFixed(2)}
                        </span>

                    </div>
                ))}
            </div>

            <AlertDialog
                open={orderToCancel !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setOrderToCancel(null);
                        setCancelReason("");
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Cancel Order?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            This order will be cancelled and removed from Active Orders.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <Textarea 
                        placeholder="Enter reason for cancellation (optional)"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                    />

                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                            Keep Order
                        </AlertDialogCancel>

                        <AlertDialogAction
                            className="cursor-pointer"
                            onClick={async () => {
                                if (!orderToCancel) {
                                    return;
                                }

                                await onCancelOrder(orderToCancel.id, cancelReason);
                                setOrderToCancel(null);
                                setCancelReason("");
                            }}
                        >
                            Cancel Order
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ActiveOrdersPanel;