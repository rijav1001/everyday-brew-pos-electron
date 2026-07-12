import { getDatabase } from "../database/database";

export class SettingsRepository {
    private readonly database = getDatabase();

    get(key: string): string | null {
        const result = this.database
        .prepare(
            `
            SELECT value
            FROM settings
            WHERE key = ?
        `,
        )
        .get(key) as { value: string } | undefined;

        return result?.value ?? null;
    }

    set(
        key: string,
        value: string,
    ): void {
        this.database
            .prepare(
                `
                INSERT INTO settings(key, value)
                VALUES(?, ?)
                ON CONFLICT(key)
                DO UPDATE SET value = excluded.value
                `,
            )
            .run(key, value);
    }
}