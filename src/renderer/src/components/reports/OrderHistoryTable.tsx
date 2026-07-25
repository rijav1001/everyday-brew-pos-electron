import { format } from "date-fns";

import { OrderHistoryItemDto } from "src/shared/orderHistory";

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
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface OrderHistoryTableProps {
    orders: OrderHistoryItemDto[];
}

function OrderHistoryTable({
    orders,
}: OrderHistoryTableProps) {
    
    const navigate = useNavigate();

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

                                    </TableRow>

                                );
                            })
                        )}

                    </TableBody>

                </Table>

                <div className="flex justify-end">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => navigate("/reports/orders/history")}    
                    >
                        See Detailed Order History
                    </Button>
                </div>

            </CardContent>

        </Card>
    );
}

export default OrderHistoryTable;