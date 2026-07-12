import { Coffee, CupSoda, Cookie, Snowflake } from "lucide-react";

import { cn } from "@renderer/lib/utils";
import type { Category } from "@renderer/types/menu";

interface CategoryItemProps {
    category: Category;
    selected: boolean;
    onClick: (categoryId: string) => void;
}

const iconMap = {
    coffee: Coffee,
    snowflake: Snowflake,
    cup: CupSoda,
    cookie: Cookie,
};

function CategoryItem({ category, selected, onClick }: CategoryItemProps) {
    const Icon = iconMap[category.icon] ?? Coffee;

    return (
        <button
            onClick={() => onClick(category.id)}
            className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer",
                selected
            ? "bg-accent text-white shadow-md"
            : "text-(--text-primary) hover:bg-background"
            )}
        >
            <Icon size={18} />

            <span className="text-sm font-medium">
                {category.name}
            </span>
        </button>
    );
}

export default CategoryItem;