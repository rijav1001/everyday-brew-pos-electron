import { CreateOrderDto, OrderDetailsDto, OrderItemDto } from "../../shared/order";
import { OrderHistoryItemDto } from "../../shared/orderHistory";
import { BusinessDayRepository } from "../repositories/BusinessDayRepository";
import { OrderItemRepository } from "../repositories/OrderItemRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { BusinessDayService } from "./BusinessDayService";
import { SettingsRepository } from "../repositories/SettingsRepository";

export class OrderService {
    private readonly orderRepository = new OrderRepository();
    private readonly orderItemRepository = new OrderItemRepository();
    private readonly businessDayRepository = new BusinessDayRepository();
    private readonly settingsRepository = new SettingsRepository();
    private readonly businessDayService = new BusinessDayService(this.businessDayRepository, this.settingsRepository);

    async createActiveOrder(order: CreateOrderDto): Promise<string> {
        const existing = this.orderRepository.getEmptyActiveOrder();
        if (existing) {
            return existing.id;
        }

        const businessDay = await this.businessDayService.getOrCreateCurrentBusinessDay();

        return this.orderRepository.createActiveOrder(order, businessDay.id);
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

    cancelOrder(orderId: string, cancelReason: string | null): void {
        this.orderRepository.cancelOrder(orderId, cancelReason);
    }

    completeOrder(orderId: string, order: OrderDetailsDto): void {
        this.orderRepository.completeOrder(orderId, order);
    }
}