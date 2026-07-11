import { MENU_ITEMS } from "@renderer/config/menu";

import MenuCard from "./MenuCard";
import EmptyState from "../shared/EmptyState";
import { MenuItem } from "@renderer/types/menu";
import { OrderItem } from "@renderer/types/order";

interface MenuGridProps {
    categoryId: string;
    orderItems: OrderItem[];
    onIncreaseQuantity: (item: MenuItem) => void;
    onDecreaseQuantity: (itemId: string) => void;
}

function MenuGrid({ categoryId, orderItems, onIncreaseQuantity, onDecreaseQuantity }: MenuGridProps) {
    const items = MENU_ITEMS.filter(
        item => item.categoryId == categoryId
    );

    return (
        <>
            <div className="mb-5">
                <h2 className="text-lg font-semibold">
                    Menu
                </h2>

                <div className="mt-2 h-px bg-border" />
            </div>

            {items.length === 0 ? (
                <EmptyState
                    title="No menu items"
                    description="No items are available in this category."
                />
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {items.map(item => {
                        const quantity = orderItems.find(
                            order => order.menuItem.id === item.id
                        )?.quantity ?? 0;
                        return (
                            <MenuCard 
                                key={item.id} 
                                item={item} 
                                quantity={quantity}
                                onIncreaseQuantity={onIncreaseQuantity}
                                onDecreaseQuantity={onDecreaseQuantity}
                            />
                        )
                    })}
                </div>
            )}
        </>
    );
}

export default MenuGrid;