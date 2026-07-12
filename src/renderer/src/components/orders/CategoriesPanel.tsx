import CategoryItem from "./CategoryItem";
import type { CategoryDto } from "src/shared/category";

interface CategoriesPanelProps {
    selectedCategory: string;
    onCategorySelect: (categoryId: string) => void;
    categories: CategoryDto[];
}

function CategoriesPanel({ selectedCategory, onCategorySelect, categories }: CategoriesPanelProps) {
    return (
        <>
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-(--text-primary)">
                    Categories
                </h2>

                <div className="mt-2 h-px bg-border" />
            </div>

            <div className="flex flex-col gap-2">
                {categories.map((category) => (
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