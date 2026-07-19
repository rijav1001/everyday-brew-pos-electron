import { DashboardRepository } from "../repositories/DashboardRepository";
import { DashboardService } from "../services/DashboardService";
import { registerCategoryHandlers } from "./category";
import { registerDashboardHandlers } from "./dashboard";
import { registerMenuHandlers } from "./menu";
import { registerOrderHandlers } from "./order";
import { registerReceiptHandlers } from "./receipt";
import { getDatabase } from "../database/database";

export function registerIpcHandlers(): void {
    const database = getDatabase();
    const dashboardRepository = new DashboardRepository(database);
    const dashboardService = new DashboardService(dashboardRepository);

    // register ipc handlers here
    registerCategoryHandlers();
    registerMenuHandlers();
    registerOrderHandlers();
    registerReceiptHandlers();
    registerDashboardHandlers(dashboardService);
}