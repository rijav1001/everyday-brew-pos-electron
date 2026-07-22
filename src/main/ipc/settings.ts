import { ipcMain } from "electron";
import { SettingsService } from "../services/SettingsService";
import { AppSettingsDto, BusinessSettingsDto, ReceiptSettingsDto, TaxSettingsDto } from "../../shared/settings";

export function registerSettingsHandlers(settingsService: SettingsService) {
    ipcMain.handle(
        "settings:getBusiness", () =>
            settingsService.getBusinessSettings(), 
    );

    ipcMain.handle(
        "settings:saveBusiness", (_, settings: BusinessSettingsDto) =>
            settingsService.saveBusinessSettings(settings),
    );

    ipcMain.handle(
        "settings:getReceipt", () =>
            settingsService.getReceiptSettings(),
    );

    ipcMain.handle(
        "settings:saveReceipt", (_, settings: ReceiptSettingsDto) =>
            settingsService.saveReceiptSettings(settings),
    );

    ipcMain.handle(
        "settings:getTax", () =>
            settingsService.getTaxSettings(),
    );

    ipcMain.handle(
        "settings:saveTax", (_, settings: TaxSettingsDto) =>
            settingsService.saveTaxSettings(settings),
    );

    ipcMain.handle(
        "settings:getApp", () =>
            settingsService.getAppSettings(),
    );

    ipcMain.handle(
        "settings:saveApp", (_, settings: AppSettingsDto) =>
            settingsService.saveAppSettings(settings),
    );

    ipcMain.handle(
        "settings:backupDatabase", () =>
            settingsService.backupDatabase(),
    );

    ipcMain.handle(
        "settings:restoreDatabase", () =>
            settingsService.restoreDatabase(),
    );
}