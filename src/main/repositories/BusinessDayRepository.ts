import { randomUUID } from "node:crypto";

import { getDatabase } from "../database/database";
import { BusinessDayStatus } from "../../shared/enums";
import { BusinessDayDto } from "../../shared/businessDay";

export class BusinessDayRepository {
    private readonly database = getDatabase();

    private readonly createBusinessDayStatement =
        this.database.prepare(`
            INSERT INTO business_days (
                id,
                business_date,
                opened_at,
                scheduled_close_at,
                actual_closed_at,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `);

    private readonly getOpenBusinessDayStatement =
        this.database.prepare(`
            SELECT
                id,
                business_date AS businessDate,
                opened_at AS openedAt,
                scheduled_close_at AS scheduledCloseAt,
                actual_closed_at AS actualClosedAt,
                status
            FROM business_days
            WHERE status = ?
            LIMIT 1
        `);

    private readonly closeBusinessDayStatement =
        this.database.prepare(`
            UPDATE business_days
            SET
                status = ?,
                actual_closed_at = ?
            WHERE id = ?
        `);

    private readonly extendBusinessDayStatement =
        this.database.prepare(`
            UPDATE business_days
            SET scheduled_close_at = ?
            WHERE id = ?
            AND status = ?
        `);

    createBusinessDay(
        businessDate: string,
        openedAt: string,
        scheduledCloseAt: string,
    ): string {
        const id = randomUUID();

        this.createBusinessDayStatement.run(
            id,
            businessDate,
            openedAt,
            scheduledCloseAt,
            null,
            BusinessDayStatus.OPEN,
        );

        return id;
    }

    getOpenBusinessDay(): BusinessDayDto | null {
        return (
            this.getOpenBusinessDayStatement.get(
                BusinessDayStatus.OPEN,
            ) as BusinessDayDto | undefined
        ) ?? null;
    }

    closeBusinessDay(businessDayId: string): void {
        this.closeBusinessDayStatement.run(
            BusinessDayStatus.CLOSED,
            new Date().toISOString(),
            businessDayId,
        );
    }

    extendBusinessDay(businessDayId: string, scheduledCloseAt: string): void {
        this.extendBusinessDayStatement.run(
            scheduledCloseAt,
            businessDayId,
            BusinessDayStatus.OPEN,
        );
    }
}