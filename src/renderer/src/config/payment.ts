import type { PaymentMethod } from "@renderer/types/payment";

export interface PaymentOption {
    id: PaymentMethod;
    label: string;
}

export const PAYMENT_METHODS: PaymentOption[] = [
    { id: "cash", label: "Cash" },
    { id: "card", label: "Card" },
    { id: "upi", label: "UPI" },
    { id: "split", label: "Split Payment" },
    { id: "due", label: "Due" },
];