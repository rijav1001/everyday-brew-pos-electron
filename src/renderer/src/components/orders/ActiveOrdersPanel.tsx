
import { OrderHistoryItemDto } from "src/shared/orderHistory";
import { OrderType } from "../../../../shared/enums";
import { Button } from "../ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface ActiveOrdersPanelProps {
    orders: OrderHistoryItemDto[];
    activeOrderId: string | null;
    onSelectOrder: (orderId: string) => void;
    onCreateOrder: () => void;
    onDeleteOrder: (orderId: string) => void;
}

function ActiveOrdersPanel({
    orders,
    activeOrderId,
    onSelectOrder,
    onCreateOrder,
    onDeleteOrder
}: ActiveOrdersPanelProps) {

    const [orderToDelete, setOrderToDelete] = useState<OrderHistoryItemDto | null>(null);
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
                                    setOrderToDelete(order);
                                }}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>

                        <span className="text-sm text-(--text-secondary)">
                            ₹{order.grandTotal.toFixed(2)}
                        </span>

                    </div>
                ))}
            </div>

            <AlertDialog
                open={orderToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setOrderToDelete(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Cancel Order?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            This order will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                            Keep Order
                        </AlertDialogCancel>

                        <AlertDialogAction
                            className="cursor-pointer"
                            onClick={async () => {
                                if (!orderToDelete) {
                                    return;
                                }

                                await onDeleteOrder(orderToDelete.id);
                                setOrderToDelete(null);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ActiveOrdersPanel;