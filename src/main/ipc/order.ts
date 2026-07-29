import { ipcMain } from "electron";

import { OrderRepository } from "../repositories/OrderRepository";
import type { CompletedOrderDto, CreateOrderDto } from "../../shared/order";
import { OrderService } from "../services/OrderService";

export function registerOrderHandlers(): void {
    const repository = new OrderRepository();
    const orderService = new OrderService();

    ipcMain.handle(
        "order:getNextBillNumber", () => 
            repository.getNextBillNumber(),
    );

    ipcMain.handle(
        "order:save", (_, order: CompletedOrderDto) =>
            repository.saveOrder(order),
    );

    ipcMain.handle(
        "order:getHistory", () =>
            repository.getHistory(),
    );

    ipcMain.handle(
        "order:getDetails", (_event, id: string) =>
            orderService.getOrderDetails(id),
    );

    ipcMain.handle(
        "order:create", (_, dto: CreateOrderDto) =>
            orderService.createActiveOrder(dto),
    );

    ipcMain.handle(
        "order:getActiveOrders", () => 
            orderService.getActiveOrders(),
    );

    ipcMain.handle(
        "order:addItem", (_event, orderId, item) =>
            orderService.addItem(orderId, item),
    );

    ipcMain.handle(
        "order:updateItem", (_event, itemId, item) =>
            orderService.updateItem(itemId, item),
    );

    ipcMain.handle(
        "order:removeItem", (_event, itemId) =>
            orderService.removeItem(itemId),
    );
}