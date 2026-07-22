import fs from "node:fs/promises";

import { dialog } from "electron";
import { closeDatabase, getDatabase, getDatabasePath, reopenDatabase } from "../database/database";

export class DatabaseService {

    async backupDatabase() {

        const result =
            await dialog.showSaveDialog({

                title: "Backup Database",

                defaultPath: "everyday-brew-backup.db",

                filters: [

                    {
                        name: "SQLite Database",
                        extensions: ["db"],
                    },

                ],

            });

        if (
            result.canceled ||
            !result.filePath
        ) {
            return;
        }

        // Flush WAL contents into the main database.
        getDatabase().pragma(
            "wal_checkpoint(TRUNCATE)",
        );

        await fs.copyFile(
            getDatabasePath(),
            result.filePath,
        );

    }

    async restoreDatabase() {

        const result =
            await dialog.showOpenDialog({

                title: "Restore Database",

                properties: [
                    "openFile",
                ],

                filters: [

                    {
                        name: "SQLite Database",
                        extensions: ["db"],
                    },

                ],

            });

        if (
            result.canceled ||
            result.filePaths.length === 0
        ) {
            return;
        }

        closeDatabase();

        try {
            await fs.copyFile(
                result.filePaths[0],
                getDatabasePath(),
            );
        } finally {
            reopenDatabase();
        }

    }

}