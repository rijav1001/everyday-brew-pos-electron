import { CompletedOrderDto, OrderDetailsDto, OrderItemDto } from "../../shared/order";
import { OrderHistoryItemDto } from "../../shared/orderHistory";
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
}