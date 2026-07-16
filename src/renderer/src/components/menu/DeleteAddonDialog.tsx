import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@renderer/components/ui/alert-dialog";

interface DeleteAddonDialogProps {
    open: boolean;
    addonName: string;
    onOpenChange(open: boolean): void;
    onConfirm(): Promise<void>;
}

function DeleteAddonDialog({
    open,
    addonName,
    onOpenChange,
    onConfirm,
}: DeleteAddonDialogProps) {
    async function handleDelete() {
        try {
            await onConfirm();
            onOpenChange(false);
        } catch {
            // Keep the dialog open in case of failure to delete...
        }
        
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Menu Item
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <strong>{addonName}</strong>?
                        <br />
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        className="cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteAddonDialog;