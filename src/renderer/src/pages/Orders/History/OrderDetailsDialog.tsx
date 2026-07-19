import { Button } from "@renderer/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog";
import { receiptService } from "@renderer/services/receiptService";
import { OrderDetailsDto } from "src/shared/order";

interface OrderDetailsDialogProps {
    order: OrderDetailsDto | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function OrderDetailsDialog({
    order,
    open,
    onOpenChange,
}: OrderDetailsDialogProps) {
    if (!order) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>
                        Order Details
                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    {/* Header */}

                    <div className="space-y-1">

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Bill No.
                            </span>

                            <span className="font-medium">
                                {order.billNumber}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Payment
                            </span>

                            <span className="capitalize">
                                {order.paymentMethod}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Date
                            </span>

                            <span>
                                {new Date(order.completedAt).toLocaleString()}
                            </span>
                        </div>

                    </div>

                    <div className="border-t" />

                    {/* Items */}

                    <div className="space-y-4">

                        {order.items.map(item => (
                            <div
                                key={`${item.menuItemName}-${item.notes}`}
                                className="rounded-lg border p-3"
                            >

                                <div className="flex justify-between">

                                    <div>

                                        <p className="font-medium">
                                            {item.menuItemName}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Qty {item.quantity}
                                        </p>

                                    </div>

                                    <span>
                                        ₹{item.unitPrice.toFixed(2)}
                                    </span>

                                </div>

                                {item.addons.length > 0 && (

                                    <div className="mt-2 space-y-1">

                                        {item.addons.map(addon => (
                                            <p
                                                key={`${addon.name}-${addon.price}`}
                                                className="ml-3 text-sm text-muted-foreground"
                                            >
                                                • {addon.name} (+₹{addon.price.toFixed(2)})
                                            </p>
                                        ))}

                                    </div>

                                )}

                                {item.notes && (

                                    <p className="mt-2 text-sm italic text-muted-foreground">
                                        &quot;{item.notes}&quot;
                                    </p>

                                )}

                            </div>
                        ))}

                    </div>

                    <div className="border-t" />

                    {/* Totals */}

                    <div className="space-y-2">

                        <div className="flex justify-between">
                            <span>
                                Subtotal
                            </span>

                            <span>
                                ₹{order.subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                GST
                            </span>

                            <span>
                                ₹{order.gstAmount.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between text-lg font-semibold">

                            <span>
                                Grand Total
                            </span>

                            <span>
                                ₹{order.grandTotal.toFixed(2)}
                            </span>

                        </div>

                        <div className="border-t pt-4 flex justify-end">
                            <Button
                                className="cursor-pointer"
                                onClick={async () => 
                                    await receiptService.print(order.id)
                                }
                            >
                                Print Receipt
                            </Button>
                        </div>

                    </div>

                </div>

            </DialogContent>
        </Dialog>
    );
}

export default OrderDetailsDialog;