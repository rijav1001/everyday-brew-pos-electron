import { useEffect, useState } from "react";

import { DashboardSummaryDto, HourlySalesDto, PaymentMethodSummaryDto, RecentOrderDto, TopSellingItemDto } from "src/shared/dashboard";

import { dashboardService } from "../services/dashboardService";

export function useDashboard() {
    const [summary, setSummary] = useState<DashboardSummaryDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [paymentSummary, setPaymentSummary] = useState<PaymentMethodSummaryDto[]>([]);
    const [topSellingItems, setTopSellingItems] = useState<TopSellingItemDto[]>([]);
    const [recentOrders, setRecentOrders] = useState<RecentOrderDto[]>([]);
    const [hourlySales, setHourlySales] = useState<HourlySalesDto[]>([]);

    useEffect(() => {
        async function loadSummary() {
            try {
                const result = await dashboardService.getSummary();

                const payment = await dashboardService.getPaymentMethodSummary();

                const topSellingItems = await dashboardService.getTopSellingItems();

                const recentOrders = await dashboardService.getRecentOrders();

                const hourlySales = await dashboardService.getHourlySales();

                setSummary(result);
                setPaymentSummary(payment);
                setTopSellingItems(topSellingItems);
                setRecentOrders(recentOrders);
                setHourlySales(hourlySales);
            } finally {
                setLoading(false);
            }
        }

        loadSummary();
    }, []);

    return {
        summary,
        paymentSummary,
        topSellingItems,
        recentOrders,
        hourlySales,
        loading,
    };
}