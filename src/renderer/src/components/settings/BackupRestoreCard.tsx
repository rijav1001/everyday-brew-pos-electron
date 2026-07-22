import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface BackupRestoreCardProps {
    onBackup(): Promise<void>;
    onRestore(): Promise<void>;
}

function BackupRestoreCard({
    onBackup,
    onRestore
}: BackupRestoreCardProps) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    Backup & Restore
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                <div className="space-y-2">

                    <p className="font-medium">
                        Database Backup
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Create a backup of your entire POS database.
                    </p>

                    <Button
                        className="cursor-pointer"
                        onClick={onBackup}
                    >
                        Backup Database
                    </Button>

                </div>

                <div className="space-y-2">

                    <p className="font-medium">
                        Database Restore
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Restore a previously created database backup.
                        This will overwrite the current database.
                    </p>

                    <Button
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={onRestore}
                    >
                        Restore Database
                    </Button>

                </div>

            </CardContent>

        </Card>

    );
}

export default BackupRestoreCard;