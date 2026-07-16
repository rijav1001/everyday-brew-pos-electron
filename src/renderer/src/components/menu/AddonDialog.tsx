/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { CreateMenuAddonRequest, MenuAddonDto } from "src/shared/menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddonDialogProps {
    open: boolean;
    mode: "create" | "edit";
    menuItemId: string;
    addon?: MenuAddonDto;
    onOpenChange(open: boolean): void;
    onCreate(request: CreateMenuAddonRequest): Promise<void>;
    onUpdate(addon: MenuAddonDto): Promise<void>;
}

function AddonDialog({
    open,
    mode,
    menuItemId,
    addon,
    onOpenChange,
    onCreate,
    onUpdate
}: AddonDialogProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (!open) {
            return;
        }

        if (mode === "edit" && addon) {
            setName(addon.name);
            setPrice(addon.price.toString());
            return;
        }

        setName("");
        setPrice("");
    }, [open, mode, addon]);

    async function handleSave() {
        const trimmed = name.trim();
        const addonPrice = Number(price);

        if (!trimmed || Number.isNaN(addonPrice)) {
            return;
        }

        if (mode === "create") {
            await onCreate({
                menuItemId,
                name: trimmed,
                price: addonPrice,
            });
        } else if (addon) {
            await onUpdate({
                ...addon,
                name: trimmed,
                price: addonPrice,
            });
        }

        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="bg-white sm:max-w-md">

                <DialogHeader>

                    <DialogTitle>
                        {mode === "create"
                            ? "Add Add-on"
                            : "Edit Add-on"}
                    </DialogTitle>

                    <DialogDescription>
                        Configure an optional add-on for this menu item.
                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Add-on Name
                        </label>

                        <Input
                            className="mt-1"
                            value={name}
                            placeholder="Extra Shot"
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Additional Price (₹)
                        </label>

                        <Input
                            className="mt-1"
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(event) =>
                                setPrice(event.target.value)
                            }
                        />

                    </div>

                    <div className="rounded-xl border bg-muted/30 p-4">

                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Preview
                        </p>

                        <div className="mt-2 flex items-center justify-between">

                            <p className="font-semibold">
                                {name || "Add-on"}
                            </p>

                            <p className="font-semibold">
                                +₹{price || "0.00"}
                            </p>

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

export default AddonDialog;