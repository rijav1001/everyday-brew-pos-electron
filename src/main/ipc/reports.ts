import { ipcMain } from "electron";
import { ReportFilterDto } from "../../shared/report";
import { ReportsService } from "../services/ReportsService";

export function registerReportsHandlers(reportsService: ReportsService) {
    ipcMain.handle(
        "reports:getSummary", (_, filter: ReportFilterDto) =>
            reportsService.getSummary(filter),
    );

    ipcMain.handle(
        "reports:getChart", (_, filter) =>
            reportsService.getChart(filter),
    );

    ipcMain.handle(
        "reports:getPaymentBreakdown", (_, filter) =>
            reportsService.getPaymentBreakdown(filter),
    );

    ipcMain.handle(
        "reports:getTopSellingItems", (_, filter) =>
            reportsService.getTopSellingItems(filter),
    );

    ipcMain.handle(
        "reports:getOrderHistory", (_, filter) =>
            reportsService.getOrderHistory(filter),
    );

    ipcMain.handle(
        "reports:saveCsv", (_, report) =>
            reportsService.saveCsv(report),
    );

    ipcMain.handle(
        "reports:printReport", () =>
            reportsService.printReport(),
    )
}