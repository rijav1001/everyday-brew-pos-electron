import { getDatabase } from "../database/database";
import type { CategoryDto } from "../../shared/category";

export class CategoryRepository {
    private readonly database = getDatabase();

    private readonly getAllStatement = this.database.prepare(`
        SELECT
        id,
        name,
        icon,
        sort_order AS sortOrder
        FROM categories
        ORDER BY sort_order
    `);

    getAll(): CategoryDto[] {
        return this.getAllStatement.all() as CategoryDto[];
    }
}