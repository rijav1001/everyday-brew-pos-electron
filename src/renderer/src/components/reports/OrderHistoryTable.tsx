import { format } from "date-fns";
import { Eye } from "lucide-react";

import { OrderHistoryItemDto } from "src/shared/orderHistory";

import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

interface OrderHistoryTableProps {
    orders: OrderHistoryItemDto[];
}

function OrderHistoryTable({
    orders,
}: OrderHistoryTableProps) {

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Order History
                </CardTitle>
            </CardHeader>

            <CardContent>

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>
                                Bill
                            </TableHead>

                            <TableHead>
                                Date
                            </TableHead>

                            <TableHead>
                                Time
                            </TableHead>

                            <TableHead>
                                Payment
                            </TableHead>

                            <TableHead className="text-right">
                                Total
                            </TableHead>

                            <TableHead className="w-20">
                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>
                        {orders.length === 0 ? (

                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center text-muted-foreground"
                                >
                                    No orders found for the selected period.
                                </TableCell>
                            </TableRow>

                        ) : (
                            orders.map(order => {

                                const completed =
                                    new Date(order.completedAt);

                                return (

                                    <TableRow
                                        key={order.id}
                                    >

                                        <TableCell className="font-medium">
                                            {order.billNumber}
                                        </TableCell>

                                        <TableCell>
                                            {format(
                                                completed,
                                                "dd MMM yyyy",
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            {format(
                                                completed,
                                                "hh:mm a",
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            {order.paymentMethod}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            ₹{order.grandTotal.toFixed(2)}
                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                        </TableCell>

                                    </TableRow>

                                );
                            })
                        )}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>
    );
}

export default OrderHistoryTable;