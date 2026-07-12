import { getDatabase } from "../database/database";
import type { MenuItemDto, MenuAddonDto } from "../../shared/menu";

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
}