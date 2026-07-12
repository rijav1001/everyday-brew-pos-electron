import { Minus, Plus } from "lucide-react";

import { MenuItem } from "@renderer/types/menu";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface MenuCardProps {
    item: MenuItem;
    quantity: number;
    onIncreaseQuantity: (item: MenuItem) => void;
    onDecreaseQuantity: (itemId: string) => void;
}

function MenuCard({ item, quantity, onIncreaseQuantity, onDecreaseQuantity }: MenuCardProps) {
    return (
        <Card
            className="flex h-40 flex-col rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
        >
            <div>
                <h3 className="font-semibold">
                    {item.name}
                </h3>
            </div>

            <div className="mt-auto">
                <span className="text-2xl font-bold">
                    ₹{item.displayPrice}
                </span>
            </div>

            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button 
                        className="w-full cursor-pointer"
                        size="sm" 
                        onClick={(event) => {
                            event.stopPropagation();
                            onIncreaseQuantity(item);
                        }}
                    >
                        Add Item
                    </Button>
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="icon"
                            onClick={(event) => {
                                event.stopPropagation();
                                onDecreaseQuantity(item.id);
                            }}
                        >
                            <Minus size={16} />
                        </Button>

                        <span className="w-8 text-center font-semibold">
                            {quantity}
                        </span>

                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="icon"
                            onClick={(event) => {
                                event.stopPropagation();
                                onIncreaseQuantity(item);
                            }}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                )}
            </div>

        </Card>
    );
}

export default MenuCard;