import { DashboardSummaryDto, HourlySalesDto, PaymentMethodSummaryDto, RecentOrderDto, TopSellingItemDto } from "src/shared/dashboard";

export const dashboardService = {
    getSummary() {
        return window.api.dashboard.getSummary() as Promise<DashboardSummaryDto>;
    },

    getPaymentMethodSummary() {
        return window.api.dashboard.getPaymentMethodSummary() as Promise<PaymentMethodSummaryDto[]>;
    },

    getTopSellingItems() {
        return window.api.dashboard.getTopSellingItems() as Promise<TopSellingItemDto[]>;
    },

    getRecentOrders() {
        return window.api.dashboard.getRecentOrders() as Promise<RecentOrderDto[]>;
    },

    getHourlySales() {
        return window.api.dashboard.getHourlySales() as Promise<HourlySalesDto[]>;
    }
};