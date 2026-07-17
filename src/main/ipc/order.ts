import { ipcMain } from "electron";

import { OrderRepository } from "../repositories/OrderRepository";
import type { CompletedOrderDto } from "../../shared/order";

export function registerOrderHandlers(): void {
    const repository = new OrderRepository();

    ipcMain.handle(
        "order:getNextBillNumber", () => 
            repository.getNextBillNumber(),
    );

    ipcMain.handle(
        "order:save", (_event, order: CompletedOrderDto) => {
            repository.saveOrder(order);
        },
    );
}