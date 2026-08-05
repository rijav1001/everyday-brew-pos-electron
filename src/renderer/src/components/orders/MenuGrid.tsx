import MenuCard from "./MenuCard";
import EmptyState from "../shared/EmptyState";
import { MenuItem } from "@renderer/types/menu";
import { OrderItem } from "@renderer/types/order";
import type { MenuItemDto } from "src/shared/menu";

interface MenuGridProps {
    categoryId: string;
    orderItems: OrderItem[];
    onIncreaseQuantity: (item: MenuItem) => void;
    onDecreaseQuantity: (itemId: string) => void;
    menuItems: MenuItemDto[];
    searchQuery: string;
}

function MenuGrid({ categoryId, orderItems, onIncreaseQuantity, onDecreaseQuantity, menuItems, searchQuery }: MenuGridProps) {
    const filteredMenuItems = menuItems.filter(item =>
        item.categoryId === categoryId &&
        item.name.toLowerCase().includes(
            searchQuery.trim().toLowerCase(),
        )
    );

    return (
        <>
            {filteredMenuItems.length === 0 ? (
                <EmptyState
                    title="No menu items"
                    description="No items are available in this category, try different search"
                />
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {filteredMenuItems.map(item => {
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