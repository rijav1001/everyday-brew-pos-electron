import { OrderItemDto } from "../../shared/order";
import { areAddonsEqual, normalizeNotes } from "../../shared/utils/orderUtils";
import { getDatabase } from "../database/database";
import { randomUUID } from "node:crypto";

export class OrderItemRepository {
    private readonly database = getDatabase();

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

    private readonly updateOrderItemStatement = this.database.prepare(`
        UPDATE order_items
        SET
            menu_item_name = ?,
            unit_price = ?,
            gst_rate = ?,
            quantity = ?,
            notes = ?
            WHERE id = ?
    `);

    private readonly deleteOrderItemAddonsStatement = this.database.prepare(`
        DELETE FROM order_item_addons
        WHERE order_item_id = ?
    `);

    private readonly deleteOrderItemStatement = this.database.prepare(`
        DELETE FROM order_items
        WHERE id = ?
    `);

    private readonly getOrderTotalsStatement = this.database.prepare(`
        SELECT
            IFNULL(
                SUM(
                    (
                        oi.unit_price +
                        IFNULL((
                            SELECT SUM(price)
                            FROM order_item_addons
                            WHERE order_item_id = oi.id
                        ), 0)
                    ) * oi.quantity
                ),
                0
            ) AS subtotal,

            IFNULL(
                SUM(
                    (
                        (
                            oi.unit_price +
                            IFNULL((
                                SELECT SUM(price)
                                FROM order_item_addons
                                WHERE order_item_id = oi.id
                            ), 0)
                        ) * oi.quantity
                    ) -
                    (
                        (
                            oi.unit_price +
                            IFNULL((
                                SELECT SUM(price)
                                FROM order_item_addons
                                WHERE order_item_id = oi.id
                            ), 0)
                        ) * oi.quantity
                    ) / (1 + oi.gst_rate / 100.0)
                ),
                0
            ) AS gstAmount
        FROM order_items oi
        WHERE oi.order_id = ?
    `);

    private readonly updateOrderTotalsStatement = this.database.prepare(`
        UPDATE orders
        SET
            subtotal = ?,
            gst_amount = ?,
            grand_total = ?
        WHERE id = ?
    `);
    
    addItem(orderId: string, item: OrderItemDto): void {
        const normalizedNotes = normalizeNotes(item.notes);

        const existingItems = this.getItems(orderId);

        const existingItem = existingItems.find(existing =>
            existing.menuItemName === item.menuItemName &&
            normalizeNotes(existing.notes) === normalizedNotes &&
            areAddonsEqual(existing.addons, item.addons)
        );

        if (existingItem) {
            this.updateItem(
                existingItem.id!,
                {
                    ...existingItem,
                    quantity: existingItem.quantity + item.quantity,
                }
            );

            return;
        }

        const orderItemId = randomUUID();

        this.insertOrderItemStatement.run(
            orderItemId,
            orderId,
            item.menuItemName,
            item.unitPrice,
            item.gstRate,
            item.quantity,
            normalizedNotes,
        );
        
        for (const addon of item.addons) {
            this.insertOrderItemAddonStatement.run(
                randomUUID(),
                orderItemId,
                addon.name,
                addon.price,
            );
        }

        this.recalculateTotals(orderId);
    }

    updateItem(itemId: string, item: OrderItemDto): void {
        const transaction = this.database.transaction(() => {
            this.updateOrderItemStatement.run(
                item.menuItemName,
                item.unitPrice,
                item.gstRate,
                item.quantity,
                item.notes,
                itemId,
            );

            this.deleteOrderItemAddonsStatement.run(itemId);

            for (const addon of item.addons) {
                this.insertOrderItemAddonStatement.run(
                    randomUUID(),
                    itemId,
                    addon.name,
                    addon.price,
                );
            }

            const orderId = this.database.prepare(`
                SELECT order_id as orderId
                FROM order_items
                WHERE id = ?
            `).get(itemId) as { orderId: string };

            this.recalculateTotals(orderId.orderId);
        });

        transaction();
    }

    removeItem(itemId: string): void {
        const transaction = this.database.transaction(() => {
            const orderId = this.database.prepare(`
                SELECT order_id as orderId
                FROM order_items
                WHERE id = ?
            `).get(itemId) as { orderId: string };

            this.deleteOrderItemAddonsStatement.run(itemId);
            this.deleteOrderItemStatement.run(itemId);
            this.recalculateTotals(orderId.orderId);
        });

        transaction();
    }

    getItems(orderId: string): OrderItemDto[] {
        const items = this.getOrderItemsStatement.all(orderId) as Array<OrderItemDto & { id: string }>;

        return items.map(item => ({
            id: item.id,
            menuItemName: item.menuItemName,
            unitPrice: item.unitPrice,
            gstRate: item.gstRate,
            quantity: item.quantity,
            notes: item.notes,
            addons: this.getOrderItemAddonsStatement.all(
                item.id,
            ) as OrderItemDto["addons"],
        }));
    }

    recalculateTotals(orderId: string): void {
        const totals = this.getOrderTotalsStatement.get(orderId) as { 
            subtotal: number, gstAmount: number 
        };

        this.updateOrderTotalsStatement.run(
            totals.subtotal,
            totals.gstAmount,
            totals.subtotal,
            orderId,
        );
    }
}