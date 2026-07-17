import { CompletedOrderDto } from "../../shared/order";
import { getDatabase } from "../database/database";
import { randomUUID } from "node:crypto";

export class OrderRepository {
    private readonly database = getDatabase();

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

    saveOrder(order: CompletedOrderDto): void {
        const transaction = this.database.transaction(
            (completedOrder: CompletedOrderDto) => {
                const orderId = randomUUID();
                const billNumber = this.getNextBillNumber();

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
    }
}