import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DashboardCardProps {
    title: string;
    value: string;
}

export function DashboardCard({
    title,
    value,
}: DashboardCardProps) {
    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}