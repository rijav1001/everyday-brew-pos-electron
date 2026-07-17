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

        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            bill_number TEXT NOT NULL UNIQUE,

            subtotal REAL NOT NULL,
            gst_amount REAL NOT NULL,
            grand_total REAL NOT NULL,

            payment_method TEXT NOT NULL,

            completed_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS order_items (
            id TEXT PRIMARY KEY,

            order_id TEXT NOT NULL,

            menu_item_name TEXT NOT NULL,
            unit_price REAL NOT NULL,
            gst_rate REAL NOT NULL,

            quantity INTEGER NOT NULL,
            notes TEXT NOT NULL,

            FOREIGN KEY(order_id)
                REFERENCES orders(id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS order_item_addons (
            id TEXT PRIMARY KEY,

            order_item_id TEXT NOT NULL,

            addon_name TEXT NOT NULL,

            price REAL NOT NULL,

            FOREIGN KEY(order_item_id)
                REFERENCES order_items(id)
                ON DELETE CASCADE
        );

    `);

    console.log("✅ SQLite initialized");

    seedDatabase();
}