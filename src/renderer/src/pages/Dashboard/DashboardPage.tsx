import { DashboardSummary } from "@renderer/components/dashboard/DashboardSummary";
import PageHeader from "@renderer/components/shared/PageHeader";
import { useDashboard } from "@renderer/hooks/useDashboard";

function DashboardPage() {
    const { summary, paymentSummary, topSellingItems, recentOrders, hourlySales, loading } = useDashboard();

    if (loading) {
        return (
            <div className="flex h-full flex-col">
                <PageHeader
                    title="Dashboard"
                    description="Business overview and sales insights"
                />

                <div className="flex flex-1 items-center justify-center">
                    <p className="text-muted-foreground">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="flex h-full flex-col">
                <PageHeader
                    title="Dashboard"
                    description="Business overview and sales insights"
                />

                <div className="flex flex-1 items-center justify-center">
                    <p className="text-muted-foreground">
                        Unable to load dashboard.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <PageHeader
                title="Dashboard"
                description="Business overview and sales insights"
            />

            <div className="flex-1 p-6">
                <DashboardSummary 
                    summary={summary} 
                    paymentSummary={paymentSummary} 
                    items={topSellingItems}
                    orders={recentOrders}
                    hourlySales={hourlySales}
                />
            </div>
        </div>
    );
}

export default DashboardPage;