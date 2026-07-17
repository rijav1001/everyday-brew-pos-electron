import type { OrderItem } from "@renderer/types/order";
import type { BillingSummary } from "@renderer/utils/billing";
import type { PaymentMethod } from "@renderer/types/payment";
import { CompletedOrderDto } from "src/shared/order";

export function mapCompletedOrder(
    items: OrderItem[],
    billing: BillingSummary,
    paymentMethod: PaymentMethod,
): CompletedOrderDto {
    return {
        subtotal: billing.subtotal,
        gstAmount: billing.cgst + billing.sgst,
        grandTotal: billing.grandTotal,

        paymentMethod,

        completedAt: new Date().toISOString(),

        items: items.map(item => ({
            menuItemName: item.menuItem.name,
            unitPrice: item.menuItem.displayPrice,
            gstRate: item.menuItem.gstRate,
            quantity: item.quantity,
            notes: item.notes,
            addons: item.selectedAddons.map(addon => ({
                name: addon.name,
                price: addon.price,
            })),
        })),
    };
}