export const receiptService = {

    print(orderId: string) {
        return window.api.receipt.print(orderId) as Promise<void>;
    },

};