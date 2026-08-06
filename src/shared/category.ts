export type MenuCategoryIcon =
    | "coffee"
    | "snowflake"
    | "cup"
    | "cookie"
    | "milk"
    | "sparkles"
    | "star"
    | "badge-plus"
    | "glass-water"
    | "leaf"
    | "cherry"
    | "droplets"
    | "shopping-bag"
    | "store"
    | "gift"
    | "package"
    | "package-2"
    | "utensils-crossed"
    | "sandwich"
    | "coffeeicon";

export interface CategoryDto {
    id: string;
    name: string;
    icon: string;
    sortOrder: number;
}

export interface CreateCategoryRequest {
    name: string;
    icon: MenuCategoryIcon;
}