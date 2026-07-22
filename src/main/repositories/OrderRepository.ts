import { CompletedOrderDto, OrderDetailsDto, OrderItemDto } from "../../shared/order";
import { OrderHistoryItemDto } from "../../shared/orderHistory";
import { PaymentBreakdownDto, ReportChartDto, ReportSummaryDto, TopSellingReportItemDto } from "../../shared/report";
import { getDatabase } from "../database/database";
import { randomUUID } from "node:crypto";

export class OrderRepository {
    private readonly database = getDatabase();

    // order creation statements
    private readonly insertOrderStatement = this.database.prepare(`
        INSERT INTO orders (
            id,
            bill_number,
            subtotal,
            gst_amount,
            grand_total,
            payment_method,
            completed_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    private readonly insertOrderItemStatement = this.database.prepare(`
        INSERT INTO order_items (
            id,
            order_id,
            menu_item_name,
            unit_price,
            gst_rate,
            quantity,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    private readonly insertOrderItemAddonStatement = this.database.prepare(`
        INSERT INTO order_item_addons (
            id,
            order_item_id,
            addon_name,
            price
        )
        VALUES (?, ?, ?, ?)
    `);

    // order history statements
    private readonly getOrderHistoryStatement = this.database.prepare(`
        SELECT
            id,
            bill_number AS billNumber,
            grand_total AS grandTotal,
            payment_method AS paymentMethod,
            completed_at AS completedAt
        FROM orders
        ORDER BY completed_at DESC
    `);

    private readonly getOrderStatement = this.database.prepare(`
        SELECT
            id,
            bill_number AS billNumber,
            subtotal,
            gst_amount AS gstAmount,
            grand_total AS grandTotal,
            payment_method AS paymentMethod,
            completed_at AS completedAt
        FROM orders
        WHERE id = ?
    `);

    private readonly getOrderItemsStatement = this.database.prepare(`
        SELECT
            id,
            menu_item_name AS menuItemName,
            unit_price AS unitPrice,
            gst_rate AS gstRate,
            quantity,
            notes
        FROM order_items
        WHERE order_id = ?
    `);

    private readonly getOrderItemAddonsStatement = this.database.prepare(`
        SELECT
            addon_name AS name,
            price
        FROM order_item_addons
        WHERE order_item_id = ?
    `);

    getNextBillNumber(): string {
        const result = this.database
        .prepare(
            `
            SELECT
                COALESCE(MAX(CAST(SUBSTR(bill_number, 3) AS INTEGER)), 0) + 1
                    AS nextBillNumber
            FROM orders
            `,
        )
        .get() as { nextBillNumber: number };

        const next = result.nextBillNumber;

        return `EB${next.toString().padStart(6, "0")}`;
    }

    saveOrder(order: CompletedOrderDto): string {
        const orderId = randomUUID();
        const billNumber = this.getNextBillNumber();

        const transaction = this.database.transaction(
            (completedOrder: CompletedOrderDto) => {
                this.insertOrderStatement.run(
                    orderId,
                    billNumber,
                    completedOrder.subtotal,
                    completedOrder.gstAmount,
                    completedOrder.grandTotal,
                    completedOrder.paymentMethod,
                    completedOrder.completedAt
                );

                for (const item of completedOrder.items) {
                    const orderItemId = randomUUID();

                    this.insertOrderItemStatement.run(
                        orderItemId,
                        orderId,
                        item.menuItemName,
                        item.unitPrice,
                        item.gstRate,
                        item.quantity,
                        item.notes,
                    );

                    for (const addon of item.addons) {
                        this.insertOrderItemAddonStatement.run(
                            randomUUID(),
                            orderItemId,
                            addon.name,
                            addon.price,
                        );
                    }
                }
            }
        );

        transaction(order);

        return orderId;
    }

    getHistory(): OrderHistoryItemDto[] {
        return this.getOrderHistoryStatement.all() as OrderHistoryItemDto[];
    }

    getDetails(id: string): OrderDetailsDto {
        const order = this.getOrderStatement.get(id) as Omit<OrderDetailsDto, "items">;

        const items = this.getOrderItemsStatement.all(id) as Array<OrderItemDto & { id: string }>;

        return {
            ...order,
            items: items.map(item => ({
                menuItemName: item.menuItemName,
                unitPrice: item.unitPrice,
                gstRate: item.gstRate,
                quantity: item.quantity,
                notes: item.notes,
                addons: this.getOrderItemAddonsStatement.all(
                    item.id,
                ) as OrderItemDto["addons"],
            })),
        };
    }

    getReportSummary(startDate: string, endDate: string): ReportSummaryDto {
        return this.database.prepare(
            `
            SELECT
                IFNULL(SUM(grand_total),0) revenue,
                COUNT(*) orders,
                IFNULL(AVG(grand_total),0) averageBill,
                IFNULL(SUM(gst_amount),0) gst
            FROM orders
            WHERE
                DATE(completed_at)
                BETWEEN DATE(?) AND DATE(?)
            `
        ).get(startDate, endDate) as ReportSummaryDto;
    }

    getReportChart(startDate: string, endDate: string): ReportChartDto[] {
        const diff = Math.ceil(
                (
                    new Date(endDate).getTime() -
                    new Date(startDate).getTime()
                ) / 86400000,
            );

        if (diff <= 1) {
            return this.database.prepare(
                `
                SELECT
                    STRFTIME('%H:00', completed_at) label,
                    SUM(grand_total) revenue,
                    COUNT(*) orders
                FROM orders
                WHERE DATE(completed_at)
                BETWEEN DATE(?)
                AND DATE(?)
                GROUP BY STRFTIME('%H', completed_at)
                ORDER BY completed_at
                `,
            )
            .all(
                startDate,
                endDate,
            ) as ReportChartDto[];
        }

        return this.database.prepare(
            `
            SELECT
                STRFTIME('%d-%m', completed_at) label,
                SUM(grand_total) revenue,
                COUNT(*) orders
            FROM orders
            WHERE DATE(completed_at)
            BETWEEN DATE(?)
            AND DATE(?)
            GROUP BY DATE(completed_at)
            ORDER BY completed_at
            `,
        )
        .all(
            startDate,
            endDate,
        ) as ReportChartDto[];
    }

    getPaymentBreakdown(startDate: string, endDate: string): PaymentBreakdownDto[] {
        return this.database.prepare(
            `
            SELECT
                payment_method paymentMethod,
                SUM(grand_total) total,
                COUNT(*) orders
            FROM orders
            WHERE DATE(completed_at)
            BETWEEN DATE(?)
            AND DATE(?)
            GROUP BY payment_method
            ORDER BY total DESC
            `,
        )
        .all(
            startDate,
            endDate,
        ) as PaymentBreakdownDto[];
    }

    getTopSellingItems(startDate: string, endDate: string): TopSellingReportItemDto[] {
        return this.database.prepare(
            `
            SELECT
                oi.menu_item_name AS menuItem,
                SUM(oi.quantity) AS quantity,
                SUM(oi.unit_price * oi.quantity) AS revenue
            FROM order_items oi
            INNER JOIN orders o
                ON o.id = oi.order_id
            WHERE DATE(o.completed_at)
            BETWEEN DATE(?)
            AND DATE(?)
            GROUP BY oi.menu_item_name
            ORDER BY quantity DESC
            LIMIT 10
            `,
        )
        .all(
            startDate,
            endDate,
        ) as TopSellingReportItemDto[];

    }

    getOrderHistory(startDate: string, endDate: string): OrderHistoryItemDto[] {
        return this.database.prepare(
            `
            SELECT
                id,
                bill_number AS billNumber,
                grand_total AS grandTotal,
                payment_method AS paymentMethod,
                completed_at AS completedAt
            FROM orders
            WHERE DATE(completed_at)
            BETWEEN DATE(?)
            AND DATE(?)
            ORDER BY completed_at DESC
            `
        )
        .all(
            startDate,
            endDate,
        ) as OrderHistoryItemDto[];
    }
}