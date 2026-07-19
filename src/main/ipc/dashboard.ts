import { ipcMain } from "electron";

import { DashboardService } from "../services/DashboardService";

export function registerDashboardHandlers(dashboardService: DashboardService) {
    ipcMain.handle(
        "dashboard:getSummary", () => 
            dashboardService.getDashboardSummary(),
    );

    ipcMain.handle(
        "dashboard:getPaymentMethodSummary", () => 
            dashboardService.getPaymentMethodSummary(),
    );

    ipcMain.handle(
        "dashboard:getTopSellingItems", () => 
            dashboardService.getTopSellingItems(),
    );

    ipcMain.handle(
        "dashboard:getRecentOrders", () =>
            dashboardService.getRecentOrders(),
    );

    ipcMain.handle(
        "dashboard:getHourlySales", () =>
            dashboardService.getHourlySales(),
    );
}