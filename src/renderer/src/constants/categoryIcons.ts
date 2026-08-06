import {
    Coffee,
    Cookie,
    CupSoda,
    Snowflake,
    CoffeeIcon,
    Milk,
    Sparkles,
    Star,
    BadgePlus,
    GlassWater,
    Leaf,
    Cherry,
    Droplets,
    ShoppingBag,
    Store,
    Gift,
    Package,
    Package2,
    UtensilsCrossed,
    Sandwich,
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
    {
        value: "coffeeicon",
        label: "Coffee Icon",
        icon: CoffeeIcon,
    },
    {
        value: "milk",
        label: "Milk",
        icon: Milk,
    },
    {
        value: "sparkles",
        label: "Sparkles",
        icon: Sparkles,
    },
    {
        value: "star",
        label: "Star",
        icon: Star,
    },
    {
        value: "badge-plus",
        label: "Badge Plus",
        icon: BadgePlus,
    },
    {
        value: "glass-water",
        label: "Glass Water",
        icon: GlassWater,
    },
    {
        value: "leaf",
        label: "Leaf",
        icon: Leaf,
    },
    {
        value: "cherry",
        label: "Cherry",
        icon: Cherry,
    },
    {
        value: "droplets",
        label: "Droplets",
        icon: Droplets,
    },
    {
        value: "shopping-bag",
        label: "Shopping Bag",
        icon: ShoppingBag,
    },
    {
        value: "store",
        label: "Store",
        icon: Store,
    },
    {
        value: "gift",
        label: "Gift",
        icon: Gift,
    },
    {
        value: "package",
        label: "Package",
        icon: Package,
    },
    {
        value: "package-2",
        label: "Package 2",
        icon: Package2,
    },
    {
        value: "utensils-crossed",
        label: "Utensils Crossed",
        icon: UtensilsCrossed,
    },
    {
        value: "sandwich",
        label: "Sandwich",
        icon: Sandwich,
    }
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