import { Database } from "better-sqlite3";

export function runMigrations(db: Database): void {
    const version = db.pragma("user_version", { simple: true }) as number;

    if (version < 1) {
        // Current schema baseline.
        // The schema is created by initializeDatabase().
        db.pragma("user_version = 1");
    }

    if (version < 2) {
        db.exec(`
            ALTER TABLE orders
            ADD COLUMN discount_type TEXT;

            ALTER TABLE orders
            ADD COLUMN discount_value REAL NOT NULL DEFAULT 0;

            ALTER TABLE orders
            ADD COLUMN discount_amount REAL NOT NULL DEFAULT 0;
        `);

        db.pragma("user_version = 2");
    }
}