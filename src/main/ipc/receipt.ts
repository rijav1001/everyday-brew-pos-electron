import { ipcMain } from "electron";
import { ReceiptHtmlBuilder } from "../receipt/ReceiptHtmlBuilder";
import { ReceiptPrinter } from "../receipt/ReceiptPrinter";
import { ReceiptService } from "../services/ReceiptService";
import { OrderRepository } from "../repositories/OrderRepository";

export function registerReceiptHandlers(): void {
    const orderRepository = new OrderRepository();
    const receiptHtmlBuilder = new ReceiptHtmlBuilder();
    const receiptPrinter = new ReceiptPrinter();
    const service = new ReceiptService(orderRepository, receiptHtmlBuilder, receiptPrinter);

    ipcMain.handle(
        "receipt:print", (_, orderId: string) =>
            service.print(orderId),
    );

}