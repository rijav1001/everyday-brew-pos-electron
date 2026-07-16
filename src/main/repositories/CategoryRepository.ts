import { getDatabase } from "../database/database";
import type { CategoryDto, CreateCategoryRequest } from "../../shared/category";
import { createSlug } from "../../shared/utils/slug";

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

    private readonly createStatement = this.database.prepare(`
        INSERT INTO categories (
            id,
            name,
            icon,
            sort_order
        )
        VALUES (?, ?, ?, ?)
    `);

    private readonly updateStatement = this.database.prepare(`
        UPDATE categories
        SET
            name = ?,
            icon = ?,
            sort_order = ?
        WHERE id = ?
    `);

    private readonly deleteStatement = this.database.prepare(`
        DELETE FROM categories
        WHERE id = ?
    `);

    getAll(): CategoryDto[] {
        return this.getAllStatement.all() as CategoryDto[];
    }

    create(request: CreateCategoryRequest): void {
        const id = createSlug(request.name);

        const sortOrder = 
            (
                this.database
                    .prepare(
                        `
                        SELECT
                            COALESCE(MAX(sort_order), 0) + 1 AS sortOrder
                        FROM categories
                        `,
                    )
                    .get() as {
                        sortOrder: number;
                    }
            ).sortOrder;
        this.createStatement.run(
            id,
            request.name,
            request.icon,
            sortOrder
        )
    }

    update(category: CategoryDto): void {
        this.updateStatement.run(
            category.name,
            category.icon,
            category.sortOrder,
            category.id
        );
    }

    delete(id: string): void {
        this.deleteStatement.run(id);
    }
}