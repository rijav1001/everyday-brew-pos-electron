/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";

import { menuService } from "@renderer/services/menuService";

import type {
    CategoryDto,
    CreateCategoryRequest,
} from "../../../shared/category";
import { toast } from "sonner";

export function useCategories() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    const loadCategories = useCallback(async () => {
        const data = await menuService.getCategories();

        setCategories(data);
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    async function createCategory(request: CreateCategoryRequest) {
        try {
            await menuService.createCategory(request);

            toast.success("Category created successfully!");

            await loadCategories();
        } catch {
            toast.error("Failed to create category.");

            throw new Error();
        }
    }

    async function updateCategory(category: CategoryDto) {
        try {
            await menuService.updateCategory(category);

            toast.success("Category updated successfully!");

            await loadCategories();
        } catch {
            toast.error("Failed to update category.");

            throw new Error();
        }
    }

    async function deleteCategory(id: string) {
        try {
            await menuService.deleteCategory(id);

            toast.success("Category deleted successfully!");

            await loadCategories();
        } catch {
            toast.error("This category contains menu items. Delete or move them first.");

            throw new Error();
        }
    }

    return {
        categories,

        createCategory,

        updateCategory,

        deleteCategory,

        reload: loadCategories,
    };
}