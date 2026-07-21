import { IndianRupee, ReceiptText, ShoppingCart, Percent } from "lucide-react";

import { ReportSummaryDto } from "src/shared/report";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../../../shared/utils/currency";

interface ReportSummaryCardProps {
    summary?: ReportSummaryDto;
}

function ReportSummaryCard({
    summary,
}: ReportSummaryCardProps) {
    const revenue = summary?.revenue ?? 0;
    const orders = summary?.orders ?? 0;
    const averageBill = summary?.averageBill ?? 0;
    const gst = summary?.gst ?? 0;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
                title="Revenue"
                value={`${formatCurrency(revenue)}`}
                icon={<IndianRupee className="h-5 w-5" />}
            />

            <SummaryCard
                title="Orders"
                value={orders.toString()}
                icon={<ShoppingCart className="h-5 w-5" />}
            />

            <SummaryCard
                title="Average Bill"
                value={`${formatCurrency(averageBill)}`}
                icon={<ReceiptText className="h-5 w-5" />}
            />

            <SummaryCard
                title="GST Collected"
                value={`${formatCurrency(gst)}`}
                icon={<Percent className="h-5 w-5" />}
            />

        </div>
    );
}

interface SummaryCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

function SummaryCard({
    title,
    value,
    icon,
}: SummaryCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>

                {icon}
            </CardHeader>

            <CardContent>
                <div className="text-3xl font-bold">
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}

export default ReportSummaryCard;