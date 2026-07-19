import { DashboardRepository } from "../repositories/DashboardRepository";

export class DashboardService {
    constructor(private readonly repository: DashboardRepository) {}

    getDashboardSummary() {
        return this.repository.getDashboardSummary();
    }

    getPaymentMethodSummary() {
        return this.repository.getPaymentMethodSummary();
    }

    getTopSellingItems() {
        return this.repository.getTopSellingItems();
    }

    getRecentOrders() {
        return this.repository.getRecentOrders();
    }

    getHourlySales() {
        return this.repository.getHourlySales();
    }
}