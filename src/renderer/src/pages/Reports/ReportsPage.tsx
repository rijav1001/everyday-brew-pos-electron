import OrderHistoryTable from "@renderer/components/reports/OrderHistoryTable";
import PaymentBreakdownCard from "@renderer/components/reports/PaymentBreakdownCard";
import ReportsFilterCard from "@renderer/components/reports/ReportsFilterCard";
import ReportSummaryCard from "@renderer/components/reports/ReportSummaryCard";
import { RevenueChart } from "@renderer/components/reports/RevenueChart";
import TopSellingItemsCard from "@renderer/components/reports/TopSellingItemsCard";
import { useReportFilters } from "@renderer/hooks/useReportFilters";
import { useReports } from "@renderer/hooks/useReports";

function ReportsPage() {
    const {
        range,
        filter,
        updateRange,
        setFilter,
    } = useReportFilters();

    const { 
        summary, 
        chart, 
        paymentBreakdown,
        topSellingItems,
        orderHistory,
        refreshReport,
        exportCsv,
        printReport
    } = useReports(filter);

    return (
        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Reports
            </h1>

            <ReportsFilterCard
                range={range}
                filter={filter}
                onRangeChange={updateRange}
                onFilterChange={setFilter}
                onGenerate={() => {
                    refreshReport(filter);
                }}
                exportCsv={exportCsv}
                printReport={printReport}
            />

            <ReportSummaryCard
                summary={summary}
            />

            <RevenueChart
                chart={chart}
            />

            <div className="grid gap-4 lg:grid-cols-2">

                <PaymentBreakdownCard
                    data={paymentBreakdown}
                />

                <TopSellingItemsCard
                    data={topSellingItems}
                />

                <OrderHistoryTable
                    orders={orderHistory}
                />

            </div>

        </div>
    );
}

export default ReportsPage;