import { AppSettingsDto, BusinessSettingsDto, ReceiptSettingsDto, TaxSettingsDto } from "../../shared/settings";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { DatabaseService } from "./DatabaseService";

export class SettingsService {
    constructor(
        private readonly repository: SettingsRepository,
        private readonly databaseService: DatabaseService,
    ) {}

    getBusinessSettings(): BusinessSettingsDto {
        return this.repository.getBusinessSettings();
    }

    saveBusinessSettings(settings: BusinessSettingsDto) {
        this.repository.saveBusinessSettings(settings);
    }

    getReceiptSettings(): ReceiptSettingsDto {
        return this.repository.getReceiptSettings();
    }

    saveReceiptSettings(settings: ReceiptSettingsDto) {
        this.repository.saveReceiptSettings(settings);
    }

    getTaxSettings(): TaxSettingsDto {
        return this.repository.getTaxSettings();
    }

    saveTaxSettings(settings: TaxSettingsDto) {
        this.repository.saveTaxSettings(settings);
    }

    getAppSettings(): AppSettingsDto {
        return this.repository.getAppSettings();
    }

    saveAppSettings(settings: AppSettingsDto) {
        this.repository.saveAppSettings(settings);
    }

    async backupDatabase() {
        await this.databaseService.backupDatabase();
    }

    async restoreDatabase() {
        await this.databaseService.restoreDatabase();
    }
}