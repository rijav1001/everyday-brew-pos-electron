import { registerCategoryHandlers } from "./category";
import { registerMenuHandlers } from "./menu";

export function registerIpcHandlers(): void {
    registerCategoryHandlers();
    registerMenuHandlers();
}