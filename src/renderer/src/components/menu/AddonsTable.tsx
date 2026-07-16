import { MenuAddonDto } from "src/shared/menu";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteAddonDialog from "./DeleteAddonDialog";

interface AddonsTableProps {
    addons: MenuAddonDto[];
    onEdit(addon: MenuAddonDto): void;
    onDelete(id: string): Promise<void>;
    onCreate(): void;
}

function AddonsTable({
    addons,
    onEdit,
    onDelete,
    onCreate,
}: AddonsTableProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addonToDelete, setAddonToDelete] = useState<MenuAddonDto>();

    return (
        <Card className="rounded-2xl">

            <div className="flex items-center justify-between border-b p-6">

                <div>

                    <h2 className="text-xl font-semibold">
                        Add-ons
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Optional extras for this menu item.
                    </p>

                </div>

                <Button
                    className="cursor-pointer"
                    onClick={onCreate}
                >
                    Add Add-on
                </Button>

            </div>

            <div className="divide-y">

                {addons.map(addon => (

                    <div
                        key={addon.id}
                        className="flex items-center justify-between p-5"
                    >

                        <div>

                            <p className="font-medium">
                                {addon.name}
                            </p>

                        </div>

                        <div className="flex items-center gap-6">

                            <div className="text-right">

                                <p className="font-semibold">
                                    +₹{addon.price.toFixed(2)}
                                </p>

                            </div>

                            <div className="flex gap-2">

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        onEdit(addon)
                                    }
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setAddonToDelete(addon);
                                        setDeleteDialogOpen(true);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>

                            </div>

                        </div>

                    </div>

                ))}

                {addons.length === 0 && (

                    <div className="flex flex-col items-center justify-center gap-4 py-14">

                        <div className="text-center">

                            <h3 className="text-lg font-semibold">
                                No add-ons yet
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Create your first add-on for this menu item.
                            </p>

                        </div>

                        <Button
                            className="cursor-pointer"
                            onClick={onCreate}
                        >
                            Add Add-on
                        </Button>

                    </div>

                )}

            </div>

            <DeleteAddonDialog 
                open={deleteDialogOpen}
                addonName={addonToDelete?.name ?? ""}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={async () => {
                    if (!addonToDelete) {
                        return;
                    }

                    await onDelete(addonToDelete.id);

                    setAddonToDelete(undefined);
                }}
            />

        </Card>
    );
}

export default AddonsTable;