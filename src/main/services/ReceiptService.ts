import { OrderRepository } from "../repositories/OrderRepository";

import { ReceiptHtmlBuilder } from "./ReceiptHtmlBuilder";
import { ReceiptPrinter } from "./ReceiptPrinter";

export class ReceiptService {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly receiptHtmlBuilder: ReceiptHtmlBuilder,
        private readonly receiptPrinter: ReceiptPrinter,
    ) {}

    async print(orderId: string): Promise<void> {

        const order = this.orderRepository.getDetails(orderId);

        if (!order) {
            throw new Error(`Order not found: ${orderId}`);
        }

        const html = this.receiptHtmlBuilder.build(order);

        await this.receiptPrinter.print(html);

    }

}