import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { ReportChartDto } from "src/shared/report";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { formatCurrency } from "../../../../shared/utils/currency";

interface RevenueChartProps {
    chart: ReportChartDto[];
}

export function RevenueChart({
    chart,
}: RevenueChartProps) {

    if (chart.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        Revenue Trend
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex h-75 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        No revenue data available for the selected period.
                    </p>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card>

                <CardHeader>
                    <CardTitle>
                        Revenue Trend
                    </CardTitle>
                </CardHeader>

                <CardContent className="h-75">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={chart}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                            />

                            <YAxis />

                            <Tooltip
                                formatter={(value) => [
                                    `${formatCurrency(Number(value))}`,
                                    "Revenue",
                                ]}
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </CardContent>

            </Card>
        );
    }
}