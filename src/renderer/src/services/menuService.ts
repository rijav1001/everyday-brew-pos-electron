import type { 
    CategoryDto,
    CreateCategoryRequest
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

    createCategory(category: CreateCategoryRequest) {
        return window.api.category.create(category);
    },

    updateCategory(category: CategoryDto) {
        return window.api.category.update(category);
    },

    deleteCategory(id: string) {
        return window.api.category.delete(id);
    }
};