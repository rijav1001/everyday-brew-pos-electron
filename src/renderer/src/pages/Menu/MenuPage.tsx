import PageHeader from "@renderer/components/shared/PageHeader";
import CategoriesTable from "@renderer/components/menu/CategoriesTable";
import { useCategories } from "@renderer/hooks/useCategories";
import MenuItemsTable from "@renderer/components/menu/MenuItemsTable";
import { useMenuItems } from "@renderer/hooks/useMenuItems";

function MenuPage() {
    const { categories, createCategory, updateCategory, deleteCategory } = useCategories();

    const { menuItems, createMenuItem, updateMenuItem, deleteMenuItem, createAddon, updateAddon, deleteAddon } = useMenuItems();

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

                <div className="mt-6">
                    <MenuItemsTable
                        menuItems={menuItems}
                        categories={categories}
                        onCreate={createMenuItem}
                        onUpdate={updateMenuItem}
                        onDelete={deleteMenuItem}
                        onCreateAddon={createAddon}
                        onUpdateAddon={updateAddon}
                        onDeleteAddon={deleteAddon}
                    />
                </div>
            </div>
        </div>
    );
}

export default MenuPage;