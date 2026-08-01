/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderType } from "../../../../shared/enums";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface NewOrderDialogProps {
    open: boolean;
    onCreate: (
        orderType: OrderType,
        tableNumber: number | null,
    ) => void | Promise<void>;
    onCancel: () => void;
}

function NewOrderDialog({ open, onCreate, onCancel }: NewOrderDialogProps) {
    const [orderType, setOrderType] = useState<OrderType>(OrderType.TAKEAWAY);
    const [tableNumber, setTableNumber] = useState("");

    useEffect(() => {
        if (!open) {
            return;
        }

        setOrderType(OrderType.TAKEAWAY);
        setTableNumber("");
    }, [open]);

    async function handleCreate() {
        if (orderType === OrderType.DINE_IN && tableNumber.trim() === "") {
            toast.error("Please enter a table number.");
            return;
        }

        await onCreate(
            orderType,
            orderType === OrderType.DINE_IN ? parseInt(tableNumber.trim()) : null,
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onCancel();
                }
            }}
        >
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle>Create New Order</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        type="button"
                        variant={
                            orderType === OrderType.TAKEAWAY
                                ? "default"
                                : "outline"
                        }
                        className="h-28 flex-col gap-3 text-lg font-semibold cursor-pointer"
                        onClick={() => setOrderType(OrderType.TAKEAWAY)}
                    >
                        <span className="text-2xl">🛍️</span>
                        <span>Takeaway</span>
                    </Button>

                    <Button
                        type="button"
                        variant={
                            orderType === OrderType.DINE_IN
                                ? "default"
                                : "outline"
                        }
                        className="h-28 flex-col gap-3 text-lg font-semibold cursor-pointer"
                        onClick={() => setOrderType(OrderType.DINE_IN)}
                    >
                        <span className="text-2xl">🍽️</span>
                        <span>Dine In</span>
                    </Button>
                </div>

                {orderType === OrderType.DINE_IN && (
                    <div className="space-y-2">
                        <label htmlFor="table-number" className="text-sm font-medium">
                            Table Number
                        </label>

                        <Input
                            id="table-number"
                            value={tableNumber}
                            onChange={(e) =>
                                setTableNumber(e.target.value)
                            }
                            placeholder="e.g. 5"
                        />
                    </div>
                )}

                <DialogFooter>
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button className="cursor-pointer" onClick={handleCreate}>
                        Create Order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default NewOrderDialog;