import { registerCategoryHandlers } from "./category";
import { registerMenuHandlers } from "./menu";
import { registerOrderHandlers } from "./order";

export function registerIpcHandlers(): void {
    registerCategoryHandlers();
    registerMenuHandlers();
    registerOrderHandlers();
}