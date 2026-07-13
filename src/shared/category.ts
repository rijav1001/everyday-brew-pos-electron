export type MenuCategoryIcon =
    | "coffee"
    | "snowflake"
    | "cup"
    | "cookie";

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