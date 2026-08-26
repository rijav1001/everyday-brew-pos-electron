import { BillingSummary } from "../../../renderer/src/utils/billing";
import { PaymentMethod } from "./payment";
import { MenuAddon, MenuItem } from "./menu";

export interface CompletedOrder {
    items: OrderItem[];
    billing: BillingSummary;
    paymentMethod: PaymentMethod;
    completedAt: Date;
}

export interface OrderItem {
    id?: string;
    menuItem: MenuItem;
    quantity: number;
    selectedAddons: MenuAddon[];
    notes: string;
    normalizedNotes: string;
}