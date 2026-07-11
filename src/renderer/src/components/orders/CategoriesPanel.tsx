import CategoryItem from "./CategoryItem";

import { MENU_CATEGORIES } from "@renderer/config/menu";

interface CategoriesPanelProps {
    selectedCategory: string;
    onCategorySelect: (categoryId: string) => void;
}

function CategoriesPanel({ selectedCategory, onCategorySelect }: CategoriesPanelProps) {
    return (
        <>
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-(--text-primary)">
                    Categories
                </h2>

                <div className="mt-2 h-px bg-border" />
            </div>

            <div className="flex flex-col gap-2">
                {MENU_CATEGORIES.map((category) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        selected={selectedCategory === category.id}
                        onClick={onCategorySelect}
                    />
                ))}
            </div>
        </>
    );
}

export default CategoriesPanel;