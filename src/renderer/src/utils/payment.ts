export function calculateChange(grandTotal: number, received: number | null): number {
    if (received === null || received < grandTotal) {
        return 0;
    }

    return received - grandTotal;
}

export function calculateRemaining(grandTotal: number, cash: number | null, upi: number | null): number {
    return Math.max(grandTotal - (cash ?? 0) - (upi ?? 0), 0);
}

export function isSplitPaymentValid(grandTotal: number, cash: number | null, upi: number | null): boolean {
    return (cash ?? 0) + (upi ?? 0) === grandTotal;
}