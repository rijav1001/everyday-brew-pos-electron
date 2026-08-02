import { CompletedOrderDto, CreateOrderDto, OrderDetailsDto, OrderItemDto } from "src/shared/order";
import { OrderHistoryItemDto } from "src/shared/orderHistory";

export const orderService = {
    getNextBillNumber() {
        return window.api.order.getNextBillNumber() as Promise<string>;
    },

    // this is obsolete now
    // saveOrder(order: CompletedOrderDto) {
    //     return window.api.order.save(order) as Promise<string>;
    // },

    getHistory() {
        return window.api.order.getHistory() as Promise<OrderHistoryItemDto[]>;
    },

    getDetails(id: string) {
        return window.api.order.getDetails(id) as Promise<OrderDetailsDto>;
    },

    create(dto: CreateOrderDto) {
        return window.api.order.create(dto) as Promise<string>;
    },

    getActiveOrders() {
        return window.api.order.getActiveOrders() as Promise<OrderHistoryItemDto[]>;
    },

    addItem(orderId: string, item: OrderItemDto) {
        return window.api.order.addItem(orderId, item) as Promise<void>;
    },

    updateItem(itemId: string, item: OrderItemDto) {
        return window.api.order.updateItem(itemId, item) as Promise<void>;
    },

    removeItem(itemId: string) {
        return window.api.order.removeItem(itemId) as Promise<void>;
    },

    deleteOrder(orderId: string) {
        return window.api.order.deleteOrder(orderId) as Promise<void>;
    },

    completeOrder(orderId: string, order: CompletedOrderDto) {
        return window.api.order.completeOrder(orderId, order) as Promise<void>;
    },
};