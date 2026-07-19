export interface DashboardSummaryDto {
    todaysSales: number;
    todaysOrders: number;
    averageOrderValue: number;
    bestSellingItem: string | null;
}

export interface PaymentMethodSummaryDto {
    paymentMethod: string;
    totalAmount: number;
    orderCount: number;
}

export interface TopSellingItemDto {
    menuItemName: string;
    quantitySold: number;
    totalRevenue: number;
}

export interface RecentOrderDto {
    id: string;
    billNumber: string;
    grandTotal: number;
    paymentMethod: string;
    completedAt: string;
}

export interface HourlySalesDto {
    hour: number;
    sales: number;
    orders: number;
}