import {
    Coffee,
    Cookie,
    CupSoda,
    Snowflake,
    type LucideIcon,
} from "lucide-react";
import type { MenuCategoryIcon } from "../../../shared/category";

export interface CategoryIconOption {
    value: MenuCategoryIcon;
    label: string;
    icon: LucideIcon;
}

export const CATEGORY_ICONS: CategoryIconOption[] = [
    {
        value: "coffee",
        label: "Coffee",
        icon: Coffee,
    },
    {
        value: "snowflake",
        label: "Snowflake",
        icon: Snowflake,
    },
    {
        value: "cup",
        label: "Cup",
        icon: CupSoda,
    },
    {
        value: "cookie",
        label: "Cookie",
        icon: Cookie,
    },
];

export function getCategoryIcon(
    value: MenuCategoryIcon,
): LucideIcon {
    return (
        CATEGORY_ICONS.find(
            (option) => option.value === value,
        )?.icon ?? Coffee
    );
}

export function getCategoryIconLabel(
    value: MenuCategoryIcon,
): string {
    return (
        CATEGORY_ICONS.find(
            (option) => option.value === value,
        )?.label ?? "Coffee"
    );
}