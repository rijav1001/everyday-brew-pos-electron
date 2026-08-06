/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@renderer/components/ui/dialog";
import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { CATEGORY_ICONS, getCategoryIcon } from "@renderer/constants/categoryIcons";
import type { CategoryDto, CreateCategoryRequest, MenuCategoryIcon } from "src/shared/category";

interface CategoryDialogProps {
    open: boolean;
    mode: "create" | "edit";
    category?: CategoryDto;
    onOpenChange(open: boolean): void;
    onCreate(request: CreateCategoryRequest): Promise<void>;
    onUpdate(category: CategoryDto): Promise<void>;
}

function CategoryDialog({
    open,
    mode,
    category,
    onOpenChange,
    onCreate,
    onUpdate,
}: CategoryDialogProps) {
    const [name, setName] = useState("");

    const [icon, setIcon] = useState<MenuCategoryIcon>("coffee");

    useEffect(() => {
        if (mode === "edit" && category) {
            setName(category.name);
            setIcon(category.icon as MenuCategoryIcon);
            return;
        }

        setName("");
        setIcon("coffee");
    }, [mode, category, open]);

    async function handleSave() {
        const trimmed = name.trim();

        if (!trimmed) {
            return;
        }

        if (mode === "create") {
            await onCreate({
                name: trimmed,
                icon,
            });
        } else if (category) {
            await onUpdate({
                ...category,
                name: trimmed,
                icon,
            });
        }

        onOpenChange(false);
    }

    const SelectedIcon = getCategoryIcon(icon);

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-xl bg-white">

                <DialogHeader>

                    <DialogTitle>
                        {mode === "create"
                            ? "Add Category"
                            : "Edit Category"}
                    </DialogTitle>

                    <DialogDescription>
                        Organize your menu into categories.
                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Category Name
                        </label>

                        <Input
                            className="mt-1"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Hot Coffee"
                        />

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium mb-1">
                            Choose an icon
                        </label>

                        <div className="grid grid-cols-5 gap-3">
                            {CATEGORY_ICONS.map((option) => {
                                const Icon = option.icon;
                                const selected = icon === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setIcon(option.value)}
                                        className={`
                                            flex flex-col items-center justify-center gap-2
                                            rounded-xl border p-3 transition-all
                                            cursor-pointer
                                            ${
                                                selected
                                                    ? "border-accent bg-accent text-white"
                                                    : "border-border hover:border-accent hover:bg-(--surface-hover)"
                                            }
                                        `}
                                    >
                                        <Icon className="h-6 w-6" />

                                        <span className="text-xs text-center leading-tight">
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                    </div>

                    <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">

                        <SelectedIcon className="h-6 w-6 text-muted-foreground" />

                        <span className="font-medium">
                            {name || "Category Preview"}
                        </span>

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        className="cursor-pointer bg-accent"
                        onClick={handleSave}
                    >
                        {mode === "create"
                            ? "Create"
                            : "Save"}
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}

export default CategoryDialog;