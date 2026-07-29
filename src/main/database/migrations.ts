import { Database } from "better-sqlite3";

export function runMigrations(db: Database): void {
    const version = db.pragma("user_version", { simple: true }) as number;

    if (version < 1) {
        // Initial version
        db.pragma("user_version = 1");
    }

    if (version < 2) {
        db.exec(`
            ALTER TABLE orders
            ADD COLUMN order_type TEXT NOT NULL DEFAULT 'TAKEAWAY';

            ALTER TABLE orders
            ADD COLUMN table_number INTEGER;

            ALTER TABLE orders
            ADD COLUMN status TEXT NOT NULL DEFAULT 'ACTIVE';
        `);

        db.pragma("user_version = 2");
    }
}