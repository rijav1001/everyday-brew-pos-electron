import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@renderer/components/ui/button";
import { Card } from "@renderer/components/ui/card";
import CategoryDialog from "./CategoryDialog";
import type { CategoryDto, CreateCategoryRequest, MenuCategoryIcon } from "src/shared/category";
import { getCategoryIcon } from "@renderer/constants/categoryIcons";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface CategoriesTableProps {
    categories: CategoryDto[];
    onCreate(request: CreateCategoryRequest): Promise<void>;
    onUpdate(category: CategoryDto): Promise<void>;
    onDelete(id: string): Promise<void>;
}

function CategoriesTable({
    categories,
    onCreate,
    onUpdate,
    onDelete
}: CategoriesTableProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryDto>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryDto>();

    return (
        <>
            <Card className="rounded-2xl">

                <div className="flex items-center justify-between border-b p-6">

                    <div>

                        <h2 className="text-xl font-semibold">
                            Categories
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Organize your drinks into categories.
                        </p>

                    </div>

                    <Button
                        className="cursor-pointer"
                        onClick={() => {
                            setEditingCategory(undefined);

                            setDialogOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />

                        Add Category
                    </Button>

                </div>

                <div className="divide-y">

                    {categories.map(category => {
                        const Icon = getCategoryIcon(category.icon as MenuCategoryIcon);

                        return (
                            <div
                                key={category.id}
                                className="flex items-center justify-between p-5"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
                                        <Icon className="h-5 w-5 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {category.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setEditingCategory(category);
                                            setDialogOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4 cursor-pointer" />
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setCategoryToDelete(category);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 cursor-pointer" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </Card>

            <CategoryDialog
                open={dialogOpen}
                mode={
                    editingCategory
                        ? "edit"
                        : "create"
                }
                category={editingCategory}
                onOpenChange={setDialogOpen}
                onCreate={onCreate}
                onUpdate={onUpdate}
            />

            <DeleteCategoryDialog
                open={deleteDialogOpen}
                categoryName={categoryToDelete?.name ?? ""}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={async () => {
                    if (!categoryToDelete) {
                        return;
                    }

                    await onDelete(categoryToDelete.id);

                    setCategoryToDelete(undefined);
                }}
            />
        </>
    );
}

export default CategoriesTable;