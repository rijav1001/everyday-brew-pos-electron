/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

import { PaymentBreakdownDto, ReportChartDto, ReportFilterDto, ReportSummaryDto, TopSellingReportItemDto } from "src/shared/report";

import { reportsService } from "../services/reportsService";
import { OrderHistoryItemDto } from "src/shared/orderHistory";
import { format } from "date-fns";

export function useReports(filter: ReportFilterDto) {
    const [summary, setSummary] = useState<ReportSummaryDto>();
    const [chart, setChart] = useState<ReportChartDto[]>([]);
    const [paymentBreakdown, setPaymentBreakdown] = useState<PaymentBreakdownDto[]>([]);
    const [topSellingItems, setTopSellingItems] = useState<TopSellingReportItemDto[]>([]);
    const [orderHistory, setOrderHistory] = useState<OrderHistoryItemDto[]>([]);

    async function refreshReport(reportFilter: ReportFilterDto = filter) {
        const [summaryData, chartData, paymentBreakdownData, topSellingItemsData, orderHistoryData] =
            await Promise.all([
                reportsService.getSummary(reportFilter),
                reportsService.getChart(reportFilter),
                reportsService.getPaymentBreakdown(reportFilter),
                reportsService.getTopSellingItems(reportFilter),
                reportsService.getOrderHistory(reportFilter),
            ]);

        setSummary(summaryData);
        setChart(chartData);
        setPaymentBreakdown(paymentBreakdownData);
        setTopSellingItems(topSellingItemsData);
        setOrderHistory(orderHistoryData);
    }

    useEffect(() => {
        refreshReport(filter);
    }, []);

    // export csv
    async function exportCsv() {
        const csv = reportsService.generateCsv(
            summary!,

            paymentBreakdown,

            topSellingItems,

            orderHistory,

        );

        await window.api.reports.saveCsv({

            fileName: `Report-${format(
                new Date(),
                "yyyy-MM-dd",
            )}.csv`,

            content: csv,

        });
    }

    // print report
    async function printReport() {
        await window.api.reports.printReport();
    }

    return {
        summary,
        chart,
        paymentBreakdown,
        topSellingItems,
        orderHistory,
        refreshReport,
        exportCsv,
        printReport
    };
}