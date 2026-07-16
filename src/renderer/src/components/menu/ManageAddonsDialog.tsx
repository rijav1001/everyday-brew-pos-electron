import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@renderer/components/ui/dialog";

import { Button } from "@renderer/components/ui/button";

import AddonsTable from "./AddonsTable";
import AddonDialog from "./AddonDialog";

import type {
    CreateMenuAddonRequest,
    MenuAddonDto,
    MenuItemDto,
} from "src/shared/menu";

interface ManageAddonsDialogProps {
    open: boolean;
    menuItem?: MenuItemDto;
    onOpenChange(open: boolean): void;
    onCreateAddon(request: CreateMenuAddonRequest): Promise<void>;
    onUpdateAddon(addon: MenuAddonDto): Promise<void>;
    onDeleteAddon(id: string): Promise<void>;
}

function ManageAddonsDialog({
    open,
    menuItem,
    onOpenChange,
    onCreateAddon,
    onUpdateAddon,
    onDeleteAddon,
}: ManageAddonsDialogProps) {

    const [addonDialogOpen, setAddonDialogOpen] = useState(false);
    const [editingAddon, setEditingAddon] = useState<MenuAddonDto>();

    if (!menuItem) {
        return null;
    }

    function handleCreate() {
        setEditingAddon(undefined);
        setAddonDialogOpen(true);
    }

    function handleEdit(addon: MenuAddonDto) {
        setEditingAddon(addon);
        setAddonDialogOpen(true);
    }

    async function handleCreateAddon(request: CreateMenuAddonRequest) {
        await onCreateAddon(request);

        setAddonDialogOpen(false);
    }

    async function handleUpdateAddon(addon: MenuAddonDto) {
        await onUpdateAddon(addon);

        setAddonDialogOpen(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={onOpenChange}
            >

                <DialogContent className="bg-white sm:max-w-2xl">

                    <DialogHeader>

                        <DialogTitle>
                            Manage Add-ons
                        </DialogTitle>

                        <DialogDescription>
                            {menuItem.name}
                        </DialogDescription>

                    </DialogHeader>

                    <AddonsTable
                        addons={menuItem.addOns}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={onDeleteAddon}
                    />

                    <div className="flex justify-end">

                        <Button
                            className="cursor-pointer"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            Done
                        </Button>

                    </div>

                </DialogContent>

            </Dialog>

            <AddonDialog
                open={addonDialogOpen}
                mode={
                    editingAddon
                        ? "edit"
                        : "create"
                }
                menuItemId={menuItem.id}
                addon={editingAddon}
                onOpenChange={setAddonDialogOpen}
                onCreate={handleCreateAddon}
                onUpdate={handleUpdateAddon}
            />
        </>
    );
}

export default ManageAddonsDialog;