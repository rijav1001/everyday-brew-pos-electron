import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { HourlySalesDto } from "src/shared/dashboard";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { formatCurrency } from "../../../../shared/utils/currency";

interface HourlySalesChartProps {
    hourlySales: HourlySalesDto[];
}

export function HourlySalesChart({
    hourlySales,
}: HourlySalesChartProps) {
    const data = hourlySales.map(item => ({
        ...item,
        hour: `${item.hour.toString().padStart(2, "0")}:00`,
    }));

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Today&apos;s Sales</CardTitle>
            </CardHeader>

            <CardContent className="h-105">
                {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No sales today.
                    </div>
                ) : (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="hour" />

                            <YAxis />

                            <Tooltip
                                formatter={(value) => [
                                    `${formatCurrency(Number(value))}`,
                                    "Sales",
                                ]}
                            />

                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.15}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}