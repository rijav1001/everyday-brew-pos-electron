export interface ReportFilterDto {
    startDate: string;
    endDate: string;
}

export interface ReportSummaryDto {
    revenue: number;
    orders: number;
    averageBill: number;
    gst: number;
}

export interface ReportChartDto {
    label: string;
    revenue: number;
    orders: number;
}

export interface PaymentBreakdownDto {
    paymentMethod: string;
    total: number;
    orders: number;
}

export interface TopSellingReportItemDto {
    menuItem: string;
    quantity: number;
    revenue: number;
}