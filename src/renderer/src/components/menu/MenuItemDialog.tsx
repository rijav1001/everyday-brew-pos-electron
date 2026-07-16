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
import { Switch } from "@renderer/components/ui/switch";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@renderer/components/ui/select";

import type { CategoryDto } from "src/shared/category";
import type {
    CreateMenuItemRequest,
    MenuItemDto,
} from "src/shared/menu";

interface MenuItemDialogProps {
    open: boolean;
    mode: "create" | "edit";

    categories: CategoryDto[];

    menuItem?: MenuItemDto;

    onOpenChange(open: boolean): void;

    onCreate(
        request: CreateMenuItemRequest,
    ): Promise<void>;

    onUpdate(
        item: MenuItemDto,
    ): Promise<void>;
}

function MenuItemDialog({
    open,
    mode,
    categories,
    menuItem,
    onOpenChange,
    onCreate,
    onUpdate,
}: MenuItemDialogProps) {

    const [categoryId, setCategoryId] = useState("");

    const [name, setName] = useState("");

    const [displayPrice, setDisplayPrice] = useState("");

    const [gstRate, setGstRate] = useState("5");

    const [available, setAvailable] = useState(true);

    useEffect(() => {

        if (!open) {
            return;
        }

        if (mode === "edit" && menuItem) {

            setCategoryId(
                menuItem.categoryId,
            );

            setName(
                menuItem.name,
            );

            setDisplayPrice(
                menuItem.displayPrice.toString(),
            );

            setGstRate(
                menuItem.gstRate.toString(),
            );

            setAvailable(
                menuItem.available,
            );

            return;
        }

        setCategoryId(
            categories[0]?.id ?? "",
        );

        setName("");

        setDisplayPrice("");

        setGstRate("5");

        setAvailable(true);

    }, [
        open,
        mode,
        menuItem,
        categories,
    ]);

    async function handleSave() {

        const trimmedName = name.trim();

        const price = Number(displayPrice);

        const gst = Number(gstRate);

        if (!trimmedName || !categoryId || Number.isNaN(price) || Number.isNaN(gst)) {
            return;
        }

        if (mode === "create") {

            await onCreate({

                categoryId,

                name: trimmedName,

                displayPrice: price,

                gstRate: gst,

                available,

            });

        } else if (menuItem) {

            await onUpdate({

                ...menuItem,

                categoryId,

                name: trimmedName,

                displayPrice: price,

                gstRate: gst,

                available,

            });

        }

        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="bg-white sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>
                        {mode === "create"
                            ? "Add Menu Item"
                            : "Edit Menu Item"}
                    </DialogTitle>

                    <DialogDescription>
                        Create or update a menu item.
                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Category
                        </label>

                        <Select
                            value={categoryId}
                            onValueChange={setCategoryId}
                        >

                            <SelectTrigger className="mt-1 cursor-pointer">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent className="bg-white">

                                {categories.map(category => (

                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Item Name
                        </label>

                        <Input
                            className="mt-1"
                            value={name}
                            placeholder="Americano"
                            onChange={event =>
                                setName(
                                    event.target.value,
                                )
                            }
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="space-y-2">

                            <label className="text-sm font-medium">
                                Price (Inclusive of GST)
                            </label>

                            <Input
                                className="mt-1"
                                type="number"
                                min="0"
                                step="0.01"
                                value={displayPrice}
                                onChange={event =>
                                    setDisplayPrice(
                                        event.target.value,
                                    )
                                }
                            />

                        </div>

                        <div className="space-y-2">

                            <label className="text-sm font-medium">
                                GST Rate (%)
                            </label>

                            <Input
                                className="mt-1"
                                type="number"
                                min="0"
                                value={gstRate}
                                onChange={event =>
                                    setGstRate(
                                        event.target.value,
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="flex items-center justify-between rounded-xl border p-4">

                        <div>

                            <p className="font-medium">
                                Available
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Visible in Orders
                            </p>

                        </div>

                        <Switch
                            checked={available}
                            onCheckedChange={setAvailable}
                            className="cursor-pointer"
                        />

                    </div>

                    <div className="rounded-xl border bg-muted/30 p-4">

                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Preview
                        </p>

                        <div className="mt-2 flex items-center justify-between">

                            <div>

                                <p className="font-semibold">
                                    {name || "Menu Item"}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {categories.find(
                                        category =>
                                            category.id === categoryId,
                                    )?.name ?? ""}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-semibold">
                                    ₹
                                    {displayPrice || "0.00"}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {available ? "Available" : "Not Available"}
                                </p>

                            </div>

                        </div>

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
                            : "Save Changes"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}

export default MenuItemDialog;