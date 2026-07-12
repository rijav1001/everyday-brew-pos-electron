import { getDatabase } from "./database";

export function seedDatabase(): void {
    const database = getDatabase();

    const existingCategories = database
        .prepare("SELECT COUNT(*) AS count FROM categories")
        .get() as { count: number };

    if (existingCategories.count > 0) {
        return;
    }

    const insertCategory = database.prepare(`
        INSERT INTO categories (
        id,
        name,
        icon,
        sort_order
        )
        VALUES (?, ?, ?, ?)
    `);

    const insertMenuItem = database.prepare(`
        INSERT INTO menu_items (
        id,
        category_id,
        name,
        price,
        gst_rate,
        available,
        sort_order
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMenuAddOn = database.prepare(`
        INSERT INTO menu_addons (
        id,
        menu_item_id,
        name,
        price
        )
        VALUES (?, ?, ?, ?)
    `);

    const transaction = database.transaction(() => {

        // Categories

        insertCategory.run(
            "hot-coffee",
            "Hot Coffee",
            "coffee",
            1,
        );

        insertCategory.run(
            "cold-coffee",
            "Cold Coffee",
            "snowflake",
            2,
        );

        insertCategory.run(
            "frappe",
            "Frappe",
            "cup",
            3,
        );

        insertCategory.run(
            "tea",
            "Tea",
            "cup",
            4,
        );

        insertCategory.run(
            "desserts",
            "Desserts",
            "cookie",
            5,
        );

        // Menu Items

        insertMenuItem.run(
            "americano",
            "hot-coffee",
            "Americano",
            140,
            5,
            1,
            1,
        );

        insertMenuItem.run(
            "cappuccino",
            "hot-coffee",
            "Cappuccino",
            170,
            5,
            1,
            2,
        );

        insertMenuAddOn.run(
            "extra-shot",
            "cappuccino",
            "Extra Shot",
            30
        )

        insertMenuAddOn.run(
            "oat-milk",
            "cappuccino",
            "Oat Milk",
            40,
        )

    });

    transaction();

    console.log("✅ Database seeded");
}