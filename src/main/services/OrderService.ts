import { CreateOrderDto, OrderDetailsDto, OrderItemDto } from "../../shared/order";
import { OrderHistoryItemDto } from "../../shared/orderHistory";
import { OrderItemRepository } from "../repositories/OrderItemRepository";
import { OrderRepository } from "../repositories/OrderRepository";

export class OrderService {
    private readonly orderRepository = new OrderRepository();
    private readonly orderItemRepository = new OrderItemRepository();

    createActiveOrder(order: CreateOrderDto): string {
        return this.orderRepository.createActiveOrder(order);
    }

    getActiveOrders(): OrderHistoryItemDto[] {
        return this.orderRepository.getActiveOrders();
    }

    getOrderDetails(orderId: string): OrderDetailsDto {
        const order = this.orderRepository.getOrder(orderId);
        const items = this.orderItemRepository.getItems(orderId);

        return {
            ...order,
            items
        };
    }

    addItem(orderId: string, item: OrderItemDto): void {
        this.orderItemRepository.addItem(orderId, item);
    }

    updateItem(itemId: string, item: OrderItemDto): void {
        this.orderItemRepository.updateItem(itemId, item);
    }

    removeItem(itemId: string): void {
        this.orderItemRepository.removeItem(itemId);
    }
}