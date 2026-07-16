import { getDatabase } from "../database/database";
import type { MenuItemDto, MenuAddonDto, CreateMenuItemRequest, CreateMenuAddonRequest } from "../../shared/menu";

interface MenuItemRow {
    id: string;
    categoryId: string;
    name: string;
    displayPrice: number;
    gstRate: number;
    available: number;
    sortOrder: number;
}

export class MenuRepository {
    private readonly database = getDatabase();

    // Menu statements for managing menu items and the menu
    private readonly getMenuStatement = this.database.prepare(`
        SELECT
            id,
            category_id AS categoryId,
            name,
            price as displayPrice,
            gst_rate AS gstRate,
            available,
            sort_order AS sortOrder
        FROM menu_items
        WHERE category_id = ?
        AND available = 1
        ORDER BY sort_order
    `);

    private readonly getAllStatement = this.database.prepare(`
        SELECT
            id,
            category_id AS categoryId,
            name,
            price AS displayPrice,
            gst_rate AS gstRate,
            available,
            sort_order AS sortOrder
        FROM menu_items
        ORDER BY
            category_id,
            sort_order
    `);

    private readonly createStatement = this.database.prepare(`
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

    private readonly updateStatement = this.database.prepare(`
        UPDATE menu_items
        SET
            category_id = ?,
            name = ?,
            price = ?,
            gst_rate = ?,
            available = ?
        WHERE id = ?
    `);

    private readonly deleteStatement = this.database.prepare(`
        DELETE FROM menu_items
        WHERE id = ?
    `);

    // Addon statements for managing addons
    private readonly getAddonsStatement = this.database.prepare(`
        SELECT
            id,
            menu_item_id AS menuItemId,
            name,
            price
        FROM menu_addons
        WHERE menu_item_id = ?
        ORDER BY name
    `);

    private readonly createAddonStatement = this.database.prepare(`
        INSERT INTO menu_addons (
            id,
            menu_item_id,
            name,
            price
        )
        VALUES (?, ?, ?, ?)
    `);

    private readonly updateAddonStatement = this.database.prepare(`
        UPDATE menu_addons
        SET
            name = ?,
            price = ?
        WHERE id = ?
    `);

    private readonly deleteAddonStatement = this.database.prepare(`
        DELETE FROM menu_addons
        WHERE id = ?
    `);

    getMenuByCategory(categoryId: string): MenuItemDto[] {
        const rows = this.getMenuStatement.all(
            categoryId,
        ) as MenuItemRow[];

        return rows.map(row => ({
            ...row,

            available: Boolean(row.available),

            addOns: this.getAddons(row.id),

            notes: "",
        }));
    }

    getAddons(menuItemId: string): MenuAddonDto[] {
        return this.getAddonsStatement.all(
            menuItemId,
        ) as MenuAddonDto[];
    }

    getAll(): MenuItemDto[] {
        const rows = this.getAllStatement.all() as MenuItemRow[];

        return rows.map(row => ({
            id: row.id,
            categoryId: row.categoryId,
            name: row.name,
            displayPrice: row.displayPrice,
            gstRate: row.gstRate,
            available: Boolean(row.available),
            sortOrder: row.sortOrder,
            addOns: this.getAddons(row.id),
        }));
    }

    create(request: CreateMenuItemRequest): void {
        const id = request.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");

        const sortOrder = (
            this.database.prepare(`
                SELECT
                    COALESCE(MAX(sort_order), 0) + 1 AS sortOrder
                FROM menu_items
                WHERE category_id = ?
            `).get(request.categoryId) as {
                sortOrder: number;
            }
        ).sortOrder;

        this.createStatement.run(
            id,
            request.categoryId,
            request.name,
            request.displayPrice,
            request.gstRate,
            request.available ? 1 : 0,
            sortOrder,
        );
    }

    update(item: MenuItemDto): void {
        this.updateStatement.run(
            item.categoryId,
            item.name,
            item.displayPrice,
            item.gstRate,
            item.available ? 1 : 0,
            item.id,
        );
    }

    delete(id: string): void {
        this.deleteStatement.run(id);
    }

    createAddon(request: CreateMenuAddonRequest): void {
        const id = request.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");

        this.createAddonStatement.run(
            id,
            request.menuItemId,
            request.name,
            request.price,
        );
    }

    updateAddon(addon: MenuAddonDto): void {
        this.updateAddonStatement.run(
            addon.name,
            addon.price,
            addon.id,
        )
    }

    deleteAddon(id: string): void {
        this.deleteAddonStatement.run(id);
    }
}