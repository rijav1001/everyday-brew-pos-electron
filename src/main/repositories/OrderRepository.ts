import { OrderStatus } from "../../shared/enums";
import { CompletedOrderDto, CreateOrderDto, OrderHeaderDto } from "../../shared/order";
import { OrderHistoryItemDto } from "../../shared/orderHistory";
import { PaymentBreakdownDto, ReportChartDto, ReportSummaryDto, TopSellingReportItemDto } from "../../shared/report";
import { getDatabase } from "../database/database";
import { randomUUID } from "node:crypto";

export class OrderRepository {
    private readonly database = getDatabase();

    // order creation statements
    // this is obsolete now
    // private readonly insertOrderStatement = this.database.prepare(`
    //     INSERT INTO orders (
    //         id,
    //         bill_number,
    //         subtotal,
    //         gst_amount,
    //         grand_total,
    //         payment_method,
    //         completed_at
    //     )
    //     VALUES (?, ?, ?, ?, ?, ?, ?)
    // `);

    private readonly createActiveOrderStatement = this.database.prepare(`
        INSERT INTO orders (
            id,
            bill_number,
            subtotal,
            gst_amount,
            grand_total,
            payment_method,
            completed_at,
            order_type,
            table_number,
            business_day_id,
            status
        )
        VALUES (?, ?, 0, 0, 0, '', NULL, ?, ?, ?, ?)
    `);

    // order history statements
    private readonly getOrderHistoryStatement = this.database.prepare(`
        SELECT
            id,
            bill_number AS billNumber,
            grand_total AS grandTotal,
            payment_method AS paymentMethod,
            completed_at AS completedAt,
            order_type AS orderType,
            table_number AS tableNumber,
            status
        FROM orders
        ORDER BY completed_at DESC
    `);

    private readonly getOrderStatement = this.database.prepare(`
        SELECT
            id,
            bill_number AS billNumber,
            subtotal,
            gst_amount AS gstAmount,
            discount_type AS discountType,
            discount_value AS discountValue,
            discount_amount AS discountAmount,
            grand_total AS grandTotal,
            payment_method AS paymentMethod,
            completed_at AS completedAt,
            order_type AS orderType,
            table_number AS tableNumber,
            status
        FROM orders
        WHERE id = ?
    `);

    private readonly getActiveOrdersStatement = this.database.prepare(`
        SELECT
            id,
            bill_number AS billNumber,
            grand_total AS grandTotal,
            order_type AS orderType,
            table_number AS tableNumber,
            status
        FROM orders
        WHERE status = ?
        ORDER BY bill_number
    `);

    private readonly cancelOrderStatement = this.database.prepare(`
        UPDATE orders
        SET
            status = ?,
            cancelled_at = ?,
            cancel_reason = ?
        WHERE id = ?
    `);

    private readonly completeOrderStatement = this.database.prepare(`
        UPDATE orders
        SET
            subtotal = ?,
            gst_amount = ?,
            discount_type = ?,
            discount_value = ?,
            discount_amount = ?,
            grand_total = ?,
            payment_method = ?,
            completed_at = ?,
            status = ?
        WHERE id = ?
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

    createActiveOrder(order: CreateOrderDto, businessDayId: string): string {
        const id = randomUUID();

        const billNumber = this.getNextBillNumber();

        this.createActiveOrderStatement.run(
            id,
            billNumber,
            order.orderType,
            order.tableNumber,
            businessDayId,
            OrderStatus.ACTIVE,
        );

        return id;
    }

    getActiveOrders(): OrderHistoryItemDto[] {
        return this.getActiveOrdersStatement.all(
            OrderStatus.ACTIVE,
        ) as OrderHistoryItemDto[];
    }

    // this is obsolete now
    // saveOrder(order: CompletedOrderDto): string {
    //     const orderId = randomUUID();
    //     const billNumber = this.getNextBillNumber();

    //     this.insertOrderStatement.run(
    //         orderId,
    //         billNumber,
    //         order.subtotal,
    //         order.gstAmount,
    //         order.grandTotal,
    //         order.paymentMethod,
    //         order.completedAt,
    //     );

    //     return orderId;
    // }

    completeOrder(orderId: string, order: CompletedOrderDto): void {
        this.completeOrderStatement.run(
            order.subtotal,
            order.gstAmount,
            order.discountType,
            order.discountValue,
            order.discountAmount,
            order.grandTotal,
            order.paymentMethod,
            order.completedAt,
            OrderStatus.COMPLETED,
            orderId,
        );
    }

    getHistory(): OrderHistoryItemDto[] {
        return this.getOrderHistoryStatement.all() as OrderHistoryItemDto[];
    }

    getOrder(id: string): OrderHeaderDto {
        return this.getOrderStatement.get(id) as OrderHeaderDto;
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
                completed_at AS completedAt,
                order_type AS orderType,
                table_number AS tableNumber,
                status
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

    // Guard duplicate empty active orders
    getEmptyActiveOrder(): OrderHistoryItemDto | null {
        return this.database.prepare(`
            SELECT
                o.id,
                o.bill_number AS billNumber,
                o.grand_total AS grandTotal,
                o.payment_method AS paymentMethod,
                o.completed_at AS completedAt,
                o.order_type AS orderType,
                o.table_number AS tableNumber,
                o.status
            FROM orders o
            LEFT JOIN order_items oi
                ON oi.order_id = o.id
            WHERE
                o.status = ?
            GROUP BY o.id
            HAVING COUNT(oi.id) = 0
            LIMIT 1
        `).get(
            OrderStatus.ACTIVE,
        ) as OrderHistoryItemDto | null;
    }

    cancelOrder(orderId: string, cancelReason: string | null): void {
        this.cancelOrderStatement.run(
            OrderStatus.CANCELLED,
            new Date().toISOString(),
            cancelReason,
            orderId
        );
    }
}