import Database from "better-sqlite3";
import { app } from "electron";
import path from "node:path";

import { DATABASE_NAME } from "./constants";

let database: Database.Database | null = null;

const dbPath = path.join(app.getPath("userData"), DATABASE_NAME);

export function getDatabase(): Database.Database {
    if (database) {
      return database;
    }

    database = new Database(dbPath);

    database.pragma("journal_mode = WAL");
    database.pragma("foreign_key = ON");

    return database;
}

export function closeDatabase() {
    if (!database) {
        return;
    }

    database.close();

    database = null;
}

export function reopenDatabase(): Database.Database {
    closeDatabase();

    return getDatabase();
}

export function getDatabasePath(): string {
    return dbPath;
}