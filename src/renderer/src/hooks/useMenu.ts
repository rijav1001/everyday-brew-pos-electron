/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import { menuService } from "@renderer/services/menuService";

import type { CategoryDto } from "../../../shared/category";
import type { MenuItemDto } from "../../../shared/menu";

export function useMenu() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("hot-coffee");
    
    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadMenu(selectedCategory);
    }, [selectedCategory]);

    async function loadCategories() {
        const data = await menuService.getCategories();

        setCategories(data);
    }

    async function loadMenu(categoryId: string) {
        const data = await menuService.getMenu(categoryId);

        setMenuItems(data);
    }

    return {
        categories,

        menuItems,

        selectedCategory,

        setSelectedCategory,
    };
}