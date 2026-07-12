import type { 
    CategoryDto
} from "../../../shared/category";

import type {
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
};