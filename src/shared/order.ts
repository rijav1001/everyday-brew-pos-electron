import type { PaymentMethod } from "./payment";
import { OrderStatus, OrderType } from "./enums";

export interface Order {
    id: string;
}

export interface OrderAddonDto {
    name: string;
    price: number;
}

export interface OrderItemDto {
    id?: string;
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

    completedAt: string | null;

    items: OrderItemDto[];
}

export interface OrderDetailsDto extends CompletedOrderDto {
    id: string;

    billNumber: string;
}

export interface CreateOrderDto {
    orderType: OrderType;

    tableNumber: number | null;

    status: OrderStatus;
}

export interface OrderHeaderDto {
    id: string;
    billNumber: string;

    subtotal: number;
    gstAmount: number;
    grandTotal: number;

    paymentMethod: PaymentMethod;
    completedAt: string | null;

    orderType: OrderType;
    tableNumber: number | null;
    status: OrderStatus;
}