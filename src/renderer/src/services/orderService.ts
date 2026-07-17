import { CompletedOrderDto } from "src/shared/order";

export const orderService = {
    getNextBillNumber() {
        return window.api.order.getNextBillNumber() as Promise<string>;
    },

    saveOrder(order: CompletedOrderDto) {
        return window.api.order.save(order) as Promise<void>;
    }
};