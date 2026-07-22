import { AppSettingsDto, BusinessSettingsDto, ReceiptSettingsDto, TaxSettingsDto } from "src/shared/settings";

export const settingsService = {
    getBusinessSettings(): Promise<BusinessSettingsDto> {
        return window.api.settings.getBusiness();
    },

    saveBusinessSettings(settings: BusinessSettingsDto) {
        return window.api.settings.saveBusiness(settings);
    },

    getReceiptSettings(): Promise<ReceiptSettingsDto> {
        return window.api.settings.getReceipt();
    },

    saveReceiptSettings(settings: ReceiptSettingsDto) {
        return window.api.settings.saveReceipt(settings);
    },

    getTaxSettings(): Promise<TaxSettingsDto> {
        return window.api.settings.getTax();
    },

    saveTaxSettings(settings: TaxSettingsDto) {
        return window.api.settings.saveTax(settings);
    },

    getAppSettings(): Promise<AppSettingsDto> {
        return window.api.settings.getApp();
    },

    saveAppSettings(settings: AppSettingsDto) {
        return window.api.settings.saveApp(settings);
    },

    backupDatabase() {
        return window.api.settings.backupDatabase();
    },

    restoreDatabase() {
        return window.api.settings.restoreDatabase();
    }
};