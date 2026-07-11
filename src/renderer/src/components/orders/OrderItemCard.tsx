/* eslint-disable react/no-unescaped-entities */
import type { OrderItem } from "@renderer/types/order";

interface OrderItemCardProps {
    item: OrderItem;
}

function OrderItemCard({ item }: OrderItemCardProps) {
    const lineTotal = (item.menuItem.displayPrice) * item.quantity;

    return (
        <div className="rounded-xl border border-border p-4">

            <div className="flex justify-between">
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

                    <p className="mt-1 text-sm text-(--text-secondary)">
                        Qty {item.quantity}
                    </p>
                </div>

                <span className="font-semibold">
                    ₹{lineTotal}
                </span>
            </div>

        </div>
    );
}

export default OrderItemCard;