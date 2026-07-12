import { ipcMain } from "electron";
import { MenuRepository } from "../repositories/MenuRepository";

export function registerMenuHandlers(): void {
    const menuRepository = new MenuRepository();
    
    ipcMain.handle(
        "menu:getByCategory",
        (_, categoryId: string) => {
            return menuRepository.getMenuByCategory(categoryId);
        },
    );

    ipcMain.handle(
        "menu:getAddons",
        (_, menuItemId: string) => {
            return menuRepository.getAddons(menuItemId);
        },
    );
}