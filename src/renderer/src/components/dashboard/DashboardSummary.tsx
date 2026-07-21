import { DashboardSummaryDto, HourlySalesDto, PaymentMethodSummaryDto, RecentOrderDto, TopSellingItemDto } from "src/shared/dashboard";

import { DashboardCard } from "./DashboardCard";
import { PaymentMethodSummary } from "./PaymentMethodSummary";
import TopSellingItems from "./TopSellingItems";
import RecentOrders from "./RecentOrders";
import { HourlySalesChart } from "./HourlySalesChart";
import { formatCurrency } from "src/shared/utils/currency";

interface DashboardSummaryProps {
    summary: DashboardSummaryDto;
    paymentSummary: PaymentMethodSummaryDto[];
    items: TopSellingItemDto[];
    orders: RecentOrderDto[];
    hourlySales: HourlySalesDto[];
}

export function DashboardSummary({
    summary,
    paymentSummary,
    items,
    orders,
    hourlySales
}: DashboardSummaryProps) {
    return (
        <div className="space-y-6">

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <DashboardCard
                    title="Today's Sales"
                    value={`${formatCurrency(summary.todaysSales)}`}
                />

                <DashboardCard
                    title="Orders Today"
                    value={summary.todaysOrders.toString()}
                />

                <DashboardCard
                    title="Average Bill"
                    value={`${formatCurrency(summary.averageOrderValue)}`}
                />

                <DashboardCard
                    title="Best Seller"
                    value={summary.bestSellingItem ?? "-"}
                />
            </div>

            {/* Dashboard Body */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Left */}
                <div className="lg:col-span-2">

                    {/* Placeholder for charts */}
                    <div className="lg:col-span-2">
                        <HourlySalesChart
                            hourlySales={hourlySales}
                        />
                    </div>

                </div>

                {/* Right */}
                <div className="space-y-6">

                    <PaymentMethodSummary
                        paymentSummary={paymentSummary}
                    />

                    <TopSellingItems
                        items={items}
                    />

                    <RecentOrders
                        orders={orders}
                    />

                </div>

            </div>
        </div>
    );
}