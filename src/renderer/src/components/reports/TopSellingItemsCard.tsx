import { TopSellingReportItemDto } from "src/shared/report";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface TopSellingItemsCardProps {
    data: TopSellingReportItemDto[];
}

function TopSellingItemsCard({
    data,
}: TopSellingItemsCardProps) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Top Selling Items
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-3">
                {data.length === 0 ? (
                    <div className="flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                            No sales found.
                        </p>
                    </div>

                ) : (
                    data.map((item) => (

                        <div
                            key={item.menuItem}
                            className="flex justify-between"
                        >

                            <span>
                                {item.menuItem}
                            </span>

                            <span>
                                {item.quantity}
                            </span>

                        </div>

                    ))
                )}

            </CardContent>

        </Card>
    );
}

export default TopSellingItemsCard;