import { DEFAULT_GST_RATE } from "@renderer/config/tax";
import type { OrderItem } from "@renderer/types/order";

export interface BillingSummary {
    subtotal: number;
    taxableAmount: number;
    cgst: number;
    sgst: number;
    totalGst: number;
    roundOff: number;
    grandTotal: number;
}

interface BillingLine {
    subtotal: number;
    taxableAmount: number;
    gstAmount: number;
}

function roundToTwo(value: number): number {
    return Math.round(value * 100) / 100;
}

export function calculateBillingSummary(items: OrderItem[]): BillingSummary {
    let subtotal = 0;

    let taxableAmount = 0;

    let totalGst = 0;

    for (const item of items) {
        const line = calculateBillingLine(item)
        subtotal += line.subtotal;
        taxableAmount += line.taxableAmount;
        totalGst += line.gstAmount;
    }

    subtotal = roundToTwo(subtotal);

    taxableAmount = roundToTwo(taxableAmount);

    totalGst = roundToTwo(totalGst);

    const cgst = roundToTwo(totalGst / 2);
    const sgst = roundToTwo(totalGst / 2);

    const roundedGrandTotal = Math.round(subtotal);

    const roundOff = roundToTwo(roundedGrandTotal - subtotal);

    return {
        subtotal,
        taxableAmount,
        cgst,
        sgst,
        totalGst,
        roundOff: roundOff,
        grandTotal: roundedGrandTotal,
    };
}

function calculateBillingLine(item: OrderItem): BillingLine {
    const addonsTotal = item.selectedAddons.reduce(
        (sum, addon) => sum + addon.price,
        0,
    );

    const lineSubtotal = (item.menuItem.displayPrice + addonsTotal) * item.quantity;

    const subtotal = lineSubtotal;

    const gstRate = (item.menuItem.gstRate ?? DEFAULT_GST_RATE) / 100;

    const lineTaxable = lineSubtotal / (1 + gstRate);

    const taxableAmount = lineTaxable;

    const totalGst = lineSubtotal - lineTaxable;

    return {
        subtotal,
        taxableAmount,
        gstAmount: totalGst
    }
}