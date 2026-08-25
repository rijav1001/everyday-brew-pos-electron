import { ipcMain } from "electron";
import { BusinessDayRepository } from "../repositories/BusinessDayRepository";
import { BusinessDayService } from "../services/BusinessDayService";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { BusinessDayManager } from "../services/BusinessDayManager";

export function registerBusinessDayHandlers(): void {
    const repository = new BusinessDayRepository();
    const settingsRepository = new SettingsRepository();
    const service = new BusinessDayService(repository, settingsRepository);
    const manager = new BusinessDayManager(service);

    ipcMain.handle(
        "businessDay:getOpen", () =>
            service.getOpenBusinessDay(),
    );

    ipcMain.handle(
        "businessDay:create", (_event, businessDate: string, openedAt: string, scheduledCloseAt: string) =>
            service.createBusinessDay(businessDate, openedAt, scheduledCloseAt),
    );

    ipcMain.handle(
        "businessDay:close", (_event, businessDayId: string) =>
            service.closeBusinessDay(businessDayId),
    );

    ipcMain.handle(
        "businessDay:extend", (_event, businessDayId: string, scheduledCloseAt: string) =>
            service.extendBusinessDay(businessDayId, scheduledCloseAt),
    );

    ipcMain.handle(
        "businessDay:getStatus", () =>
            manager.getStatus(),
    );
}