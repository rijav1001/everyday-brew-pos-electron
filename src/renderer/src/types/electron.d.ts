export interface ElectronAPI {
    category: {
        getAll(): Promise<unknown>;
    };

    menu: {
        getByCategory(categoryId: string): Promise<unknown>;
        getAddons(menuItemId: string): Promise<unknown>;
    };
}