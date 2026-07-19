import { Database } from "better-sqlite3";
import { DashboardSummaryDto, HourlySalesDto, PaymentMethodSummaryDto, RecentOrderDto, TopSellingItemDto } from "../../shared/dashboard";

export class DashboardRepository {
    private readonly getDashboardSummaryStatement;
    private readonly getPaymentMethodSummaryStatement;
    private readonly getTopSellingItemsStatement;
    private readonly getRecentOrdersStatement;
    private readonly getHourlySalesStatement;

    constructor(private readonly database: Database) {
        // get the summary
        this.getDashboardSummaryStatement = this.database.prepare(`
            SELECT
                COALESCE(SUM(grand_total), 0) AS todaysSales,
                COUNT(*) AS todaysOrders,
                COALESCE(AVG(grand_total), 0) AS averageOrderValue,
                (
                    SELECT oi.menu_item_name
                    FROM order_items oi
                    INNER JOIN orders o
                        ON o.id = oi.order_id
                    WHERE DATE(o.completed_at) = DATE('now', 'localtime')
                    GROUP BY oi.menu_item_name
                    ORDER BY SUM(oi.quantity) DESC
                    LIMIT 1
                ) AS bestSellingItem
            FROM orders
            WHERE DATE(completed_at) = DATE('now', 'localtime')
        `);

        // get the payment methods
        this.getPaymentMethodSummaryStatement = this.database.prepare(`
            SELECT
                payment_method AS paymentMethod,
                SUM(grand_total) AS totalAmount,
                COUNT(*) AS orderCount
            FROM orders
            WHERE DATE(completed_at) = DATE('now', 'localtime')
            GROUP BY payment_method
            ORDER BY totalAmount DESC
        `);

        // get the top sellers
        this.getTopSellingItemsStatement = this.database.prepare(`
            SELECT
                oi.menu_item_name AS menuItemName,
                SUM(oi.quantity) AS quantitySold,
                SUM(oi.quantity * oi.unit_price) AS totalRevenue
            FROM order_items oi
            INNER JOIN orders o
                ON o.id = oi.order_id
            WHERE DATE(o.completed_at) = DATE('now', 'localtime')
            GROUP BY oi.menu_item_name
            ORDER BY quantitySold DESC,
                    totalRevenue DESC
            LIMIT 5
        `);

        // get recent orders
        this.getRecentOrdersStatement = this.database.prepare(`
            SELECT
                id,
                bill_number AS billNumber,
                grand_total AS grandTotal,
                payment_method AS paymentMethod,
                completed_at AS completedAt
            FROM orders
            WHERE DATE(completed_at) = DATE('now', 'localtime')
            ORDER BY completed_at DESC
            LIMIT 5
        `);

        // get hourly sales
        this.getHourlySalesStatement = this.database.prepare(`
            SELECT
                CAST(STRFTIME('%H', completed_at) AS INTEGER) AS hour,
                SUM(grand_total) AS sales,
                COUNT(*) AS orders
            FROM orders
            WHERE DATE(completed_at)=DATE('now','localtime')
            GROUP BY hour
            ORDER BY hour
        `);
    }

    getDashboardSummary(): DashboardSummaryDto {
        return this.getDashboardSummaryStatement.get() as DashboardSummaryDto;
    }

    getPaymentMethodSummary(): PaymentMethodSummaryDto[] {
        return this.getPaymentMethodSummaryStatement.all() as PaymentMethodSummaryDto[];
    }

    getTopSellingItems(): TopSellingItemDto[] {
        return this.getTopSellingItemsStatement.all() as TopSellingItemDto[];
    }

    getRecentOrders(): RecentOrderDto[] {
        return this.getRecentOrdersStatement.all() as RecentOrderDto[];
    }

    getHourlySales(): HourlySalesDto[] {
        return this.getHourlySalesStatement.all() as HourlySalesDto[];
    }
}