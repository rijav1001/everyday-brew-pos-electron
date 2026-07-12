import { getDatabase } from "../database/database";

export class OrderRepository {
    private readonly database = getDatabase();

    getNextKotNumber(): number {
        const result = this.database
        .prepare(
            `
            SELECT COUNT(*) + 1 AS nextKot
            FROM completed_orders
        `,
        )
        .get() as { nextKot: number };

        return result.nextKot;
    }
}