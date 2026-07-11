export type MenuCategoryIcon =
    | "coffee"
    | "snowflake"
    | "cup"
    | "cookie";

export interface MenuCategory {
    id: string;
    name: string;
    icon: MenuCategoryIcon;
}

export interface MenuAddon {
    id: string;
    name: string;
    price: number;
}

export interface MenuItem {
    id: string;
    categoryId: string;
    name: string;
    displayPrice: number;
    gstRate: number;
    available: boolean;
    addons: MenuAddon[];
}