import { DashboardRepository } from "../repositories/DashboardRepository";
import { DashboardService } from "../services/DashboardService";
import { registerCategoryHandlers } from "./category";
import { registerDashboardHandlers } from "./dashboard";
import { registerMenuHandlers } from "./menu";
import { registerOrderHandlers } from "./order";
import { registerReceiptHandlers } from "./receipt";
import { getDatabase } from "../database/database";
import { registerReportsHandlers } from "./reports";
import { registerSettingsHandlers } from "./settings";
import { OrderRepository } from "../repositories/OrderRepository";
import { ReportsService } from "../services/ReportsService";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingsService } from "../services/SettingsService";
import { DatabaseService } from "../services/DatabaseService";

export function registerIpcHandlers(): void {
    const database = getDatabase();
    const dashboardRepository = new DashboardRepository(database);
    const dashboardService = new DashboardService(dashboardRepository);
    const reportsRepository = new OrderRepository();
    const reportsService = new ReportsService(reportsRepository);
    const settingsRepository = new SettingsRepository();
    const databaseService = new DatabaseService();
    const settingsService = new SettingsService(settingsRepository, databaseService);


    // register ipc handlers here
    registerCategoryHandlers();
    registerMenuHandlers();
    registerOrderHandlers();
    registerReceiptHandlers();
    registerDashboardHandlers(dashboardService);
    registerReportsHandlers(reportsService);
    registerSettingsHandlers(settingsService);
}