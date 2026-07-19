import { registerCategoryHandlers } from "./category";
import { registerMenuHandlers } from "./menu";
import { registerOrderHandlers } from "./order";
import { registerReceiptHandlers } from "./receipt";

export function registerIpcHandlers(): void {
    registerCategoryHandlers();
    registerMenuHandlers();
    registerOrderHandlers();
    registerReceiptHandlers();
}