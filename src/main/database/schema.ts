import { getDatabase } from "./database";
import { seedDatabase } from "./seed";

export function initializeDatabase(): void {
    const db = getDatabase();

    db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        sort_order INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS menu_items (
        id TEXT PRIMARY KEY,
        category_id TEXT NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        gst_rate REAL NOT NULL,
        available INTEGER NOT NULL DEFAULT 1,
        sort_order INTEGER NOT NULL,

        FOREIGN KEY(category_id)
            REFERENCES categories(id)
        );

        CREATE TABLE IF NOT EXISTS menu_addons (
        id TEXT PRIMARY KEY,
        menu_item_id TEXT NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,

        FOREIGN KEY(menu_item_id)
            REFERENCES menu_items(id)
        );

        CREATE TABLE IF NOT EXISTS completed_orders (
        id TEXT PRIMARY KEY,
        completed_at TEXT NOT NULL,
        payment_method TEXT NOT NULL,

        subtotal REAL NOT NULL,
        taxable_amount REAL NOT NULL,
        cgst REAL NOT NULL,
        sgst REAL NOT NULL,
        round_off REAL NOT NULL,
        grand_total REAL NOT NULL
        );

        CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT NOT NULL,
        menu_item_id TEXT NOT NULL,

        quantity INTEGER NOT NULL,
        addons TEXT NOT NULL,
        notes TEXT NOT NULL,

        line_total REAL NOT NULL,

        FOREIGN KEY(order_id)
            REFERENCES completed_orders(id),

        FOREIGN KEY(menu_item_id)
            REFERENCES menu_items(id)
        );

        CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
        );
    `);

    console.log("✅ SQLite initialized");

    seedDatabase();
}