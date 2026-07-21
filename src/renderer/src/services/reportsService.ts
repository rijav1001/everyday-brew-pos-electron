import { OrderHistoryItemDto } from "src/shared/orderHistory";
import { PaymentBreakdownDto, ReportFilterDto, TopSellingReportItemDto } from "src/shared/report";
import { ReportSummaryDto } from "src/shared/report";

export const reportsService = {
    getSummary(filter: ReportFilterDto): Promise<ReportSummaryDto> {
        return window.api.reports.getReportSummary(filter);
    },

    getChart(filter: ReportFilterDto) {
        return window.api.reports.getReportChart(filter);
    },

    getPaymentBreakdown(filter: ReportFilterDto): Promise<PaymentBreakdownDto[]> {
        return window.api.reports.getPaymentBreakdown(filter);
    },

    getTopSellingItems(filter: ReportFilterDto): Promise<TopSellingReportItemDto[]> {
        return window.api.reports.getTopSellingItems(filter);
    },

    getOrderHistory(filter: ReportFilterDto): Promise<OrderHistoryItemDto[]> {
        return window.api.reports.getOrderHistory(filter);
    },

    generateCsv(
        summary: ReportSummaryDto,
        payments: PaymentBreakdownDto[],
        topItems: TopSellingReportItemDto[],
        orders: OrderHistoryItemDto[]
    ): string {

        const lines: string[] = [];

        lines.push("REPORT SUMMARY");
        lines.push("");

        lines.push(`Revenue,${summary.revenue}`);
        lines.push(`Orders,${summary.orders}`);
        lines.push(`Average Bill,${summary.averageBill}`);
        lines.push(`GST,${summary.gst}`);

        lines.push("");
        lines.push("PAYMENT BREAKDOWN");
        lines.push("Payment Method,Orders,Revenue");

        payments.forEach(payment => {

            lines.push(
                `${payment.paymentMethod},${payment.orders},${payment.total}`,
            );

        });

        lines.push("");
        lines.push("TOP SELLING ITEMS");
        lines.push("Item,Quantity,Revenue");

        topItems.forEach(item => {

            lines.push(
                `${item.menuItem},${item.quantity},${item.revenue}`,
            );

        });

        lines.push("");
        lines.push("ORDER HISTORY");
        lines.push("Bill,Completed At,Payment,Grand Total");

        orders.forEach(order => {

            lines.push(
                `${order.billNumber},${order.completedAt},${order.paymentMethod},${order.grandTotal}`,
            );

        });

        return lines.join("\n");
    }
};