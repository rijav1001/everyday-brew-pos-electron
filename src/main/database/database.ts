import Database from "better-sqlite3";
import { app } from "electron";
import path from "node:path";

import { DATABASE_NAME } from "./constants";

let database: Database.Database | null = null;

export function getDatabase(): Database.Database {
    if (database) {
      return database;
    }

    const dbPath = path.join(app.getPath("userData"), DATABASE_NAME);

    database = new Database(dbPath);

    database.pragma("journal_mode = WAL");
    database.pragma("foreign_key = ON");

    return database;
}