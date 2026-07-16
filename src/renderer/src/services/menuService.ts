import type { 
    CategoryDto,
    CreateCategoryRequest
} from "../../../shared/category";

import type {
    CreateMenuAddonRequest,
    CreateMenuItemRequest,
    MenuAddonDto,
    MenuItemDto,
} from "../../../shared/menu";

export const menuService = {
    getCategories() {
        return window.api.category.getAll() as Promise<CategoryDto[]>;
    },

    getMenu(categoryId: string) {
        return window.api.menu.getByCategory(categoryId) as Promise<MenuItemDto[]>;
    },

    getAddons(menuItemId: string) {
        return window.api.menu.getAddons(menuItemId) as Promise<MenuAddonDto[]>;
    },

    createCategory(category: CreateCategoryRequest) {
        return window.api.category.create(category);
    },

    updateCategory(category: CategoryDto) {
        return window.api.category.update(category);
    },

    deleteCategory(id: string) {
        return window.api.category.delete(id);
    },

    getAllMenuItems() {
        return window.api.menu.getAll();
    },

    createMenuItem(menu: CreateMenuItemRequest) {
        return window.api.menu.create(menu);
    },

    updateMenuItem(menu: MenuItemDto) {
        return window.api.menu.update(menu);
    },

    deleteMenuItem(id: string) {
        return window.api.menu.delete(id);
    },

    createAddon(addon: CreateMenuAddonRequest) {
        return window.api.menu.addon.create(addon);
    },

    updateAddon(addon: MenuAddonDto) {
        return window.api.menu.addon.update(addon);
    },

    deleteAddon(id: string) {
        return window.api.menu.addon.delete(id);
    },
};