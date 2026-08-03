/* eslint-disable react/no-unescaped-entities */
import type { OrderItem } from "@renderer/types/order";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

interface OrderItemCardProps {
    item: OrderItem;
    onIncreaseQuantity: (order: OrderItem) => void;
    onDecreaseQuantity: (order: OrderItem) => void;
    onEditItem: (order: OrderItem) => void;
}

function OrderItemCard({ item, onIncreaseQuantity, onDecreaseQuantity, onEditItem }: OrderItemCardProps) {
    const lineTotal = (item.menuItem.displayPrice) * item.quantity;

    return (
        <div className="rounded-xl border border-border p-4">

            <div className="flex justify-between cursor-pointer" onClick={() => onEditItem(item)}>
                <div>
                    <h3 className="font-medium">
                        {item.menuItem.name}
                    </h3>

                    {item.selectedAddons.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {item.selectedAddons.map(addon => (
                                <p key={addon.id} className="text-xs text-muted-foreground">
                                    • {addon.name} [+ ₹{addon.price}]
                                </p>
                            ))}
                        </div>
                    )}

                    {item.notes && (
                        <p className="mt-2 text-xs italic text-muted-foreground">
                            Special Instructions: "{item.notes}"
                        </p>
                    )}

                    <div
                        className="mt-2 flex items-center gap-3"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 cursor-pointer"
                            onClick={() => onDecreaseQuantity(item)}
                        >
                            <Minus size={14} />
                        </Button>

                        <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                        </span>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 cursor-pointer"
                            onClick={() => onIncreaseQuantity(item)}
                        >
                            <Plus size={14} />
                        </Button>
                    </div>
                </div>

                <span className="font-semibold">
                    ₹{lineTotal}
                </span>
            </div>

        </div>
    );
}

export default OrderItemCard;