/* eslint-disable react-hooks/set-state-in-effect */
import { Plus, Pencil, Trash2 } from "lucide-react";

import { Button } from "@renderer/components/ui/button";
import { Card } from "@renderer/components/ui/card";

import type { CategoryDto } from "src/shared/category";
import type { CreateMenuAddonRequest, CreateMenuItemRequest, MenuAddonDto, MenuItemDto } from "src/shared/menu";

import { useEffect, useState } from "react";
import MenuItemDialog from "./MenuItemDialog";
import DeleteMenuItemDialog from "./DeleteMenuItemDialog";
import ManageAddonsDialog from "./ManageAddonsDialog";

interface MenuItemsTableProps {
    menuItems: MenuItemDto[];
    categories: CategoryDto[];
    onCreate(request: CreateMenuItemRequest): Promise<void>;
    onUpdate(item: MenuItemDto): Promise<void>;
    onDelete(id: string): Promise<void>;
    onCreateAddon(request: CreateMenuAddonRequest): Promise<void>;
    onUpdateAddon(addon: MenuAddonDto): Promise<void>;
    onDeleteAddon(id: string): Promise<void>;
}

function MenuItemsTable({
    menuItems,
    categories,
    onCreate,
    onUpdate,
    onDelete,
    onCreateAddon,
    onUpdateAddon,
    onDeleteAddon
}: MenuItemsTableProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItemDto>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [menuItemToDelete, setMenuItemToDelete] = useState<MenuItemDto>();
    const [manageAddonsOpen, setManageAddonsOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemDto>();

    function getCategoryName(categoryId: string): string {
        return (
            categories.find(
                category => category.id === categoryId,
            )?.name ?? "Unknown Category"
        );
    }

    useEffect(() => {
        if (!selectedMenuItem) {
            return;
        }

        const updatedMenuItem = menuItems.find(
            item => item.id === selectedMenuItem.id,
        );

        if (updatedMenuItem) {
            setSelectedMenuItem(updatedMenuItem);
        }
    }, [
        menuItems,
        selectedMenuItem,
    ]);

    return (
        <Card className="rounded-2xl">

            <div className="flex items-center justify-between border-b p-6">

                <div>

                    <h2 className="text-xl font-semibold">
                        Menu Items
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Manage your drinks and food items.
                    </p>

                </div>

                <Button
                    className="cursor-pointer"
                    onClick={() => {
                        setEditingItem(undefined);
                        setDialogOpen(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                </Button>

            </div>

            <div className="divide-y">

                {menuItems.map(item => (

                    <div
                        key={item.id}
                        className="flex items-center justify-between p-5"
                    >

                        <div>

                            <div className="flex items-center gap-3">

                                <p className="font-medium">
                                    {item.name}
                                </p>

                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${
                                        item.available
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {item.available
                                        ? "Available"
                                        : "Unavailable"}
                                </span>

                            </div>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {getCategoryName(item.categoryId)}
                            </p>

                        </div>

                        <div className="flex items-center gap-6">

                            <div className="text-right">

                                <p className="font-semibold">
                                    ₹{item.displayPrice.toFixed(2)}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    GST {item.gstRate}%
                                </p>

                            </div>

                            <div className="flex gap-2">

                                <Button
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedMenuItem(item);
                                        setManageAddonsOpen(true);
                                    }}
                                >
                                    Manage Add-ons
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setEditingItem(item);
                                        setDialogOpen(true);
                                    }}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setMenuItemToDelete(item);
                                        setDeleteDialogOpen(true);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>

                            </div>

                        </div>

                    </div>

                ))}

                {menuItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-4 py-14">

                        <div className="text-center">

                            <h3 className="text-lg font-semibold">
                                No menu items yet
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Create your first menu item to begin taking orders.
                            </p>

                        </div>

                        <Button
                            className="cursor-pointer"
                            onClick={() => {
                                setEditingItem(undefined);
                                setDialogOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Menu Item
                        </Button>

                    </div>
                )}

            </div>

            <MenuItemDialog
                open={dialogOpen}
                mode={
                    editingItem
                        ? "edit"
                        : "create"
                }
                categories={categories}
                menuItem={editingItem}
                onOpenChange={setDialogOpen}
                onCreate={onCreate}
                onUpdate={onUpdate}
            />

            <DeleteMenuItemDialog
                open={deleteDialogOpen}
                menuItemName={menuItemToDelete?.name ?? ""}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={async () => {
                    if (!menuItemToDelete) {
                        return;
                    }

                    await onDelete(menuItemToDelete.id);

                    setMenuItemToDelete(undefined);
                }}
            />

            <ManageAddonsDialog
                open={manageAddonsOpen}
                menuItem={selectedMenuItem}
                onOpenChange={setManageAddonsOpen}
                onCreateAddon={onCreateAddon}
                onUpdateAddon={onUpdateAddon}
                onDeleteAddon={onDeleteAddon}
            />

        </Card>
    );
}

export default MenuItemsTable;