import PageHeader from "@renderer/components/shared/PageHeader";
import CategoriesTable from "@renderer/components/menu/CategoriesTable";
import { useCategories } from "@renderer/hooks/useCategories";

function MenuPage() {
    const {
        categories,

        createCategory,

        updateCategory,

        deleteCategory,
    } = useCategories();

    return (
        <div className="flex h-full flex-col">
            <PageHeader
                title="Menu"
                description="Manage menu categories, drinks and add-ons."
            />

            <div className="flex-1 overflow-auto p-6">
                <CategoriesTable
                    categories={categories}
                    onCreate={createCategory}
                    onUpdate={updateCategory}
                    onDelete={deleteCategory}
                />
            </div>
        </div>
    );
}

export default MenuPage;