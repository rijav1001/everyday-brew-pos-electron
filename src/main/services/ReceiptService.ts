import { ReceiptHtmlBuilder } from "../receipt/ReceiptHtmlBuilder";
import { ReceiptPrinter } from "../receipt/ReceiptPrinter";
import { OrderService } from "./OrderService";

export class ReceiptService {

    constructor(
        private readonly orderService: OrderService,
        private readonly receiptHtmlBuilder: ReceiptHtmlBuilder,
        private readonly receiptPrinter: ReceiptPrinter,
    ) {}

    async print(orderId: string): Promise<void> {

        const order = this.orderService.getOrderDetails(orderId);

        if (!order) {
            throw new Error(`Order not found: ${orderId}`);
        }

        const html = this.receiptHtmlBuilder.build(order);

        await this.receiptPrinter.print(html);

    }

}