export interface MenuAddonDto {
    id: string;
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