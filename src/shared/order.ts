import type { PaymentMethod } from "./payment";

export interface Order {
    id: string;
}

export interface OrderAddonDto {
    name: string;
    price: number;
}

export interface OrderItemDto {
    menuItemName: string;
    unitPrice: number;
    gstRate: number;
    quantity: number;
    notes: string;
    addons: OrderAddonDto[];
}

export interface CompletedOrderDto {
    subtotal: number;
    gstAmount: number;
    grandTotal: number;

    paymentMethod: PaymentMethod;

    completedAt: string;

    items: OrderItemDto[];
}