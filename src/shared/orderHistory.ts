import { PaymentMethod } from "./payment";

export interface OrderHistoryItemDto {
    id: string;
    billNumber: string;

    grandTotal: number;

    paymentMethod: PaymentMethod;

    completedAt: string;
}