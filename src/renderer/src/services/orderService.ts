import { CompletedOrderDto, OrderDetailsDto } from "src/shared/order";
import { OrderHistoryItemDto } from "src/shared/orderHistory";

export const orderService = {
    getNextBillNumber() {
        return window.api.order.getNextBillNumber() as Promise<string>;
    },

    saveOrder(order: CompletedOrderDto) {
        return window.api.order.save(order) as Promise<void>;
    },

    getHistory() {
        return window.api.order.getHistory() as Promise<OrderHistoryItemDto[]>;
    },

    getDetails(id: string) {
        return window.api.order.getDetails(id) as Promise<OrderDetailsDto>;
    }
};