import { ipcMain } from "electron";
import { CategoryRepository } from "../repositories/CategoryRepository";

export function registerCategoryHandlers(): void {
    const categoryRepository = new CategoryRepository();
    
    ipcMain.handle("category:getAll", () => {
        return categoryRepository.getAll();
    });
}