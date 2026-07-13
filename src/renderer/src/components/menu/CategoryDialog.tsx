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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@renderer/components/ui/select";
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
            <DialogContent className="sm:max-w-md bg-white">

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
                            Icon
                        </label>

                        <Select
                            value={icon}
                            onValueChange={(value) =>
                                setIcon(
                                    value as MenuCategoryIcon,
                                )
                            }
                        >
                            <SelectTrigger className="cursor-pointer">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent className="bg-white">

                                {CATEGORY_ICONS.map((option) => {
                                    const Icon =
                                        option.icon;

                                    return (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                {option.label}
                                            </div>
                                        </SelectItem>
                                    );
                                })}

                            </SelectContent>
                        </Select>

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
                        className="cursor-pointer"
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