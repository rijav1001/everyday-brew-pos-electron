export interface MenuAddonDto {
    id: string;
    menuItemId: string;
    name: string;
    price: number;
}

export interface MenuItemDto {
    id: string;
    categoryId: string;
    name: string;
    displayPrice: number;
    gstRate: number;
    available: boolean;
    sortOrder: number;
    addOns: MenuAddonDto[];
}

export interface CreateMenuItemRequest {
    categoryId: string;
    name: string;
    displayPrice: number;
    gstRate: number;
    available: boolean;
}

export interface CreateMenuAddonRequest {
    menuItemId: string;
    name: string;
    price: number;
}