import type { OrderItem } from "@renderer/types/order";
import type { BillingSummary } from "@renderer/utils/billing";
import type { PaymentMethod } from "@renderer/types/payment";
import { CompletedOrderDto, OrderItemDto } from "src/shared/order";
import { formatNotes, normalizeNotes } from "../../../shared/utils/orderUtils";
import { MenuItem } from "@renderer/types/menu";

export function mapCompletedOrder(
    items: OrderItem[],
    billing: BillingSummary,
    paymentMethod: PaymentMethod,
): CompletedOrderDto {
    return {
        subtotal: billing.subtotal,
        gstAmount: billing.cgst + billing.sgst,
        discountType: billing.discountType,
        discountValue: billing.discountValue,
        discountAmount: billing.discountAmount,
        grandTotal: billing.grandTotal,

        paymentMethod,

        completedAt: new Date().toISOString(),

        items: items.map(item => ({
            menuItemName: item.menuItem.name,
            unitPrice: item.menuItem.displayPrice,
            gstRate: item.menuItem.gstRate,
            quantity: item.quantity,
            notes: formatNotes(item.notes),
            addons: item.selectedAddons.map(addon => ({
                name: addon.name,
                price: addon.price,
            })),
        })),
    };
}

export function mapOrderItem(
    dto: OrderItemDto, 
    menuItems: MenuItem[],
): OrderItem {
    const menuItem = menuItems.find(item => item.name === dto.menuItemName);

    if (!menuItem) {
        throw new Error(`Menu item not found: ${dto.menuItemName}`);
    }

    return {
        id: dto.id,
        menuItem,
        quantity: dto.quantity,
        selectedAddons: dto.addons.map(addon => {
            const menuAddon = menuItem.addOns.find(
                existing => existing.name === addon.name,
            );

            if (!menuAddon) {
                throw new Error(
                    `Addon "${addon.name}" not found for "${menuItem.name}".`,
                );
            }

            return menuAddon;
        }),
        notes: formatNotes(dto.notes),
        normalizedNotes: normalizeNotes(dto.notes),
    };
}

export function mapOrderItemDto(item: OrderItem): OrderItemDto {
    return {
        id: item.id!,
        menuItemName: item.menuItem.name,
        unitPrice: item.menuItem.displayPrice,
        gstRate: item.menuItem.gstRate,
        quantity: item.quantity,
        notes: formatNotes(item.notes),
        addons: item.selectedAddons.map(addon => ({
            name: addon.name,
            price: addon.price,
        })),
    };
}