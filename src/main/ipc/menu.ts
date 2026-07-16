import { ipcMain } from "electron";
import { MenuRepository } from "../repositories/MenuRepository";
import { CreateMenuAddonRequest, CreateMenuItemRequest, MenuAddonDto, MenuItemDto } from "../../shared/menu";

export function registerMenuHandlers(): void {
    const menuRepository = new MenuRepository();
    
    ipcMain.handle(
        "menu:getByCategory", (_, categoryId: string) => {
            return menuRepository.getMenuByCategory(categoryId);
        }
    );

    ipcMain.handle(
        "menu:getAddons", (_, menuItemId: string) => {
            return menuRepository.getAddons(menuItemId);
        }
    );

    ipcMain.handle(
        "menu:getAll", () => {
            return menuRepository.getAll();
        }
    );

    ipcMain.handle(
        "menu:create", (_, menu: CreateMenuItemRequest) => {
            return menuRepository.create(menu);
        }
    );

    ipcMain.handle(
        "menu:update", (_, menu: MenuItemDto) => {
            return menuRepository.update(menu);
        }
    );

    ipcMain.handle(
        "menu:delete", (_, id: string) => {
            return menuRepository.delete(id);
        }
    );

    ipcMain.handle(
        "menu:addon:create", (_, addon: CreateMenuAddonRequest) => {
            return menuRepository.createAddon(addon);
        }
    );

    ipcMain.handle(
        "menu:addon:update", (_, addon: MenuAddonDto) => {
            return menuRepository.updateAddon(addon);
        }
    );

    ipcMain.handle(
        "menu:addon:delete", (_, id: string) => {
            return menuRepository.deleteAddon(id);
        }
    );    
}