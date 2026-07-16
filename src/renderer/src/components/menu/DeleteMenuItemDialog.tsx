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

interface DeleteMenuItemDialogProps {
    open: boolean;
    menuItemName: string;
    onOpenChange(open: boolean): void;
    onConfirm(): Promise<void>;
}

function DeleteMenuItemDialog({
    open,
    menuItemName,
    onOpenChange,
    onConfirm,
}: DeleteMenuItemDialogProps) {
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
                        <strong>{menuItemName}</strong>?
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

export default DeleteMenuItemDialog;