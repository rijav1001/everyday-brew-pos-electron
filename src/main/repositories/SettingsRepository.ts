import { AppSettingsDto, BusinessSettingsDto, ReceiptSettingsDto, TaxSettingsDto } from "../../shared/settings";
import { getDatabase } from "../database/database";

export class SettingsRepository {
    private readonly database = getDatabase();

    get(key: string): string | undefined {
        const result = this.database
        .prepare(
            `
            SELECT value
            FROM settings
            WHERE key = ?
        `,
        )
        .get(key) as { value: string } | undefined;

        return result?.value;
    }

    set(key: string, value: string): void {
        this.database.prepare(
            `
            INSERT INTO settings(key, value)
            VALUES(?, ?)
            ON CONFLICT(key)
            DO UPDATE SET value = excluded.value
            `
        )
        .run(key, value);
    }

    private getBoolean(key: string, defaultValue: boolean) {
        const value =
            this.get(key);

        return value === undefined
            ? defaultValue
            : value === "true";
    }

    private getNumber(key: string, defaultValue: number) {
        const value =
            this.get(key);

        return value === undefined
            ? defaultValue
            : Number(value);
    }

    getBusinessSettings(): BusinessSettingsDto {
        return {

            name:
                this.get("business.name") ?? "",

            gstin:
                this.get("business.gstin") ?? "",

            address:
                this.get("business.address") ?? "",

            phone:
                this.get("business.phone") ?? "",

        };
    }

    saveBusinessSettings(settings: BusinessSettingsDto) {
        this.set(
            "business.name",
            settings.name,
        );

        this.set(
            "business.gstin",
            settings.gstin,
        );

        this.set(
            "business.address",
            settings.address,
        );

        this.set(
            "business.phone",
            settings.phone,
        );
    }

    getReceiptSettings(): ReceiptSettingsDto {
        return {
            autoPrint:
                this.getBoolean(
                    "receipt.autoPrint",
                    true,
                ),

            paperWidth:
                this.getNumber(
                    "receipt.paperWidth",
                    80,
                ) as 58 | 80,

            header:
                this.get("receipt.header")
                ?? "Thank you for visiting!",

            footer:
                this.get("receipt.footer")
                ?? "Visit Again!",
        };
    }

    saveReceiptSettings(settings: ReceiptSettingsDto) {
        this.set(
            "receipt.autoPrint",
            String(settings.autoPrint),
        );

        this.set(
            "receipt.paperWidth",
            String(settings.paperWidth),
        );

        this.set(
            "receipt.header",
            settings.header,
        );

        this.set(
            "receipt.footer",
            settings.footer,
        );
    }

    getTaxSettings(): TaxSettingsDto {
        return {
            gstPercent:
                this.getNumber(
                    "tax.gstPercent",
                    18,
                ),
        };
    }

    saveTaxSettings(settings: TaxSettingsDto) {
        this.set(
            "tax.gstPercent",
            String(settings.gstPercent),
        );
    }

    getAppSettings(): AppSettingsDto {
        return {
            theme:
                (this.get("app.theme")
                    ?? "system") as
                    AppSettingsDto["theme"],
        };
    }

    saveAppSettings(settings: AppSettingsDto) {
        this.set(
            "app.theme",
            settings.theme,
        );
    }
}