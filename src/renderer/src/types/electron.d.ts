import { CategoryDto, CreateCategoryRequest } from "../../../shared/category";

export interface ElectronAPI {
    category: {
        getAll(): Promise<unknown>;
        create(category: CreateCategoryRequest): Promise<unknown>;
        update(category: CategoryDto): Promise<unknown>;
        delete(id: string): Promise<unknown>;
    };

    menu: {
        getByCategory(categoryId: string): Promise<unknown>;
        getAddons(menuItemId: string): Promise<unknown>;
    };
}