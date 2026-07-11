import { useMemo, useState } from "react";

import { Button } from "@renderer/components/ui/button";
import { Checkbox } from "@renderer/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@renderer/components/ui/dialog";
import { Textarea } from "@renderer/components/ui/textarea";

import type { MenuAddon, MenuItem } from "@renderer/types/menu";

interface CustomizeDrinkDialogProps {
    item: MenuItem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (addons: MenuAddon[], notes: string) => void;
}

function CustomizeDrinkDialog({
    item,
    open,
    onOpenChange,
    onConfirm,
}: CustomizeDrinkDialogProps) {
    const [selectedAddons, setSelectedAddons] = useState<MenuAddon[]>([]);
    const [notes, setNotes] = useState("");

    const total = useMemo(() => {
        if (!item) return 0;

        const addonsTotal =
            selectedAddons.reduce(
                (sum, addon) => sum + addon.price,
                0
            );

        return item.displayPrice + addonsTotal;

    }, [item, selectedAddons]);

    function toggleAddon(addon: MenuAddon) {

        setSelectedAddons(previous => {
            const exists = 
                previous.some(
                    value => value.id === addon.id
                );

            if (exists) {
                return previous.filter(
                    value => value.id !== addon.id
                );
            }

            return [...previous, addon];
        });

    }

    function closeDialog() {
        setSelectedAddons([]);
        setNotes("");

        onOpenChange(false);
    }

    if (!item) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-md bg-white">

                <DialogHeader>
                    <DialogTitle>
                        Customize your {item.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold">
                            {item.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            ₹{item.displayPrice}
                        </p>
                    </div>

                    {item.addons.length > 0 && (

                        <div>
                            <h4 className="mb-3 text-sm font-semibold">
                                Add-ons
                            </h4>

                            <div className="space-y-3">
                                {item.addons.map(addon => {
                                    const isSelected = selectedAddons.some(
                                        value => value.id === addon.id
                                    );

                                    return (
                                        <div
                                            key={addon.id}
                                            onClick={() => toggleAddon(addon)}
                                            className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors" 
                                        >

                                            <div className="flex items-center gap-3">

                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={(event) => event.stopPropagation()}
                                                />

                                                <span>
                                                    {addon.name}
                                                </span>

                                            </div>

                                            <span className="text-sm font-medium">
                                                +₹{addon.price}
                                            </span>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    )}

                    <div>

                        <h4 className="mb-2 text-sm font-semibold">
                            Special Instructions
                        </h4>

                        <Textarea
                            placeholder="Example: Less Sugar, No Ice..."
                            value={notes}
                            onChange={(event) =>
                                setNotes(event.target.value)
                            }
                        />

                    </div>

                    <div className="flex items-center justify-between border-t pt-4">

                        <span className="font-semibold">
                            Total
                        </span>

                        <span className="text-xl font-bold">
                            ₹{total}
                        </span>

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() =>
                            closeDialog()
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        className="cursor-pointer"
                        onClick={() => {

                            onConfirm(
                                selectedAddons,
                                notes.trim(),
                            );

                            closeDialog();

                        }}
                    >
                        Add to Order
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}

export default CustomizeDrinkDialog;