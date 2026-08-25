import { useMemo } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@renderer/components/ui/dialog";
import { Button } from "@renderer/components/ui/button";

interface BusinessDayClosingDialogProps {
    open: boolean;
    scheduledCloseAt: string;
    onExtend: (minutes: number) => void | Promise<void>;
    onClose: () => void;
}

const EXTENSIONS = [
    { label: "30 minutes", minutes: 30 },
    { label: "1 hour", minutes: 60 },
    { label: "1.5 hours", minutes: 90 },
    { label: "2 hours", minutes: 120 },
    { label: "3 hours", minutes: 180 },
];

function BusinessDayClosingDialog({
    open,
    scheduledCloseAt,
    onExtend,
    onClose,
}: BusinessDayClosingDialogProps) {
    const formattedCloseTime = useMemo(
        () =>
            new Date(scheduledCloseAt).toLocaleTimeString(
                [],
                {
                    hour: "numeric",
                    minute: "2-digit",
                },
            ),
        [scheduledCloseAt],
    );

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose();
                }
            }}
        >
            <DialogContent className="bg-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Business day closing soon
                    </DialogTitle>

                    <DialogDescription>
                        Today&apos;s business day is scheduled to
                        close at {formattedCloseTime}.
                        Would you like to extend it?
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-3">
                    {EXTENSIONS.map((extension) => (
                        <Button
                            key={extension.minutes}
                            type="button"
                            variant="outline"
                            className="h-12 cursor-pointer"
                            onClick={() =>
                                onExtend(extension.minutes)
                            }
                        >
                            {extension.label}
                        </Button>
                    ))}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={onClose}
                    >
                        Don&apos;t Extend
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default BusinessDayClosingDialog;