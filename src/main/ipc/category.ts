import { ipcMain } from "electron";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryDto, CreateCategoryRequest } from "../../shared/category";

export function registerCategoryHandlers(): void {
    const categoryRepository = new CategoryRepository();
    
    ipcMain.handle("category:getAll", () => {
        return categoryRepository.getAll();
    });

    ipcMain.handle("category:create", (_, category: CreateCategoryRequest) => {
        return categoryRepository.create(category);
    });

    ipcMain.handle("category:update", (_, category: CategoryDto) => {
        return categoryRepository.update(category);
    });

    ipcMain.handle("category:delete", (_, id: string) => {
        return categoryRepository.delete(id);
    });
}