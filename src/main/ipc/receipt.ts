import { ipcMain } from "electron";
import { ReceiptHtmlBuilder } from "../receipt/ReceiptHtmlBuilder";
import { ReceiptPrinter } from "../receipt/ReceiptPrinter";
import { ReceiptService } from "../services/ReceiptService";
import { OrderService } from "../services/OrderService";

export function registerReceiptHandlers(): void {
    const orderService = new OrderService();
    const receiptHtmlBuilder = new ReceiptHtmlBuilder();
    const receiptPrinter = new ReceiptPrinter();
    const service = new ReceiptService(orderService, receiptHtmlBuilder, receiptPrinter);

    ipcMain.handle(
        "receipt:print", (_, orderId: string) =>
            service.print(orderId),
    );

}