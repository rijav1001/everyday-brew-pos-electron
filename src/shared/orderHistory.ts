import { OrderStatus, OrderType } from "./enums";
import { PaymentMethod } from "./payment";

export interface OrderHistoryItemDto {
    id: string;
    billNumber: string;

    grandTotal: number;

    paymentMethod: PaymentMethod;

    completedAt: string;

    orderType: OrderType;
    tableNumber: number | null;
    status: OrderStatus;
}