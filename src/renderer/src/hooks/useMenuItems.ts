/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";

import { menuService } from "@renderer/services/menuService";

import type { CreateMenuAddonRequest, CreateMenuItemRequest, MenuAddonDto, MenuItemDto } from "../../../shared/menu";
import { toast } from "sonner";

export function useMenuItems() {
    const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);

    const loadMenuItems =
        useCallback(async () => {
            const items =
                await menuService.getAllMenuItems();

            setMenuItems(items);
        }, []);

    useEffect(() => {
        loadMenuItems();
    }, [loadMenuItems]);

    async function createMenuItem(request: CreateMenuItemRequest) {
        try {
            await menuService.createMenuItem(request);

            toast.success("Menu item created successfully!");

            await loadMenuItems();
        } catch {
            toast.error("Failed to create menu item.");

            throw new Error();
        }
    }

    async function updateMenuItem(menu: MenuItemDto) {
        try {
            await menuService.updateMenuItem(menu);

            toast.success("Menu item updated successfully!");

            await loadMenuItems();
        } catch {
            toast.error("Failed to update menu item.");

            throw new Error();
        }
    }

    async function deleteMenuItem(id: string) {
        try {
            await menuService.deleteMenuItem(id);

            toast.success("Menu item deleted successfully!");

            await loadMenuItems();
        } catch {
            toast.error("Cannot delete menu item. Remove its add-ons first.");

            throw new Error();
        }
    }

    async function createAddon(request: CreateMenuAddonRequest) {
        try {
            await menuService.createAddon(request);

            toast.success("Addon created successfully!");

            await loadMenuItems();
        } catch {
            toast.error("Failed to create addon.");

            throw new Error();
        }
    }

    async function updateAddon(addon: MenuAddonDto) {
        try {
            await menuService.updateAddon(addon);

            toast.success("Addon updated successfully!");

            await loadMenuItems();
        } catch {
            toast.error("Failed to update addon.");

            throw new Error();
        }
    }

    async function deleteAddon(id: string) {
        try {
            await menuService.deleteAddon(id);

            toast.success("Addon deleted successfully!");

            await loadMenuItems();
        } catch {
            toast.error("Failed to delete addon.");

            throw new Error();
        }
    }

    return {
        menuItems,

        createMenuItem,

        updateMenuItem,

        deleteMenuItem,

        createAddon,

        updateAddon,

        deleteAddon,

        reload: loadMenuItems,
    };
}