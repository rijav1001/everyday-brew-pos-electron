import { Coffee } from "lucide-react";

import { TopSellingItemDto } from "src/shared/dashboard";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface TopSellingItemsProps {
    items: TopSellingItemDto[];
}

function TopSellingItems({
    items,
}: TopSellingItemsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Top Selling Items
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No sales today.
                    </p>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={item.menuItemName}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                    {index + 1}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <Coffee className="h-4 w-4 text-muted-foreground" />

                                        <p className="font-medium">
                                            {item.menuItemName}
                                        </p>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        {item.quantitySold} sold
                                    </p>
                                </div>
                            </div>

                            <p className="font-semibold">
                                ₹{item.totalRevenue.toFixed(2)}
                            </p>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}

export default TopSellingItems;