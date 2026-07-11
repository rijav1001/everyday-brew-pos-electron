import {
    ChartColumn,
    Coffee,
    LayoutDashboard,
    Settings,
    ShoppingCart,
} from "lucide-react";

import type { NavigationItem } from "@renderer/types/navigation";
import { ROUTES } from "@renderer/config/routes";

export const navigationItems: NavigationItem[] = [
    {
        id: "orders",
        title: "Orders",
        path: ROUTES.ORDERS,
        icon: ShoppingCart,
    },
    {
        id: "dashboard",
        title: "Dashboard",
        path: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        id: "menu",
        title: "Menu",
        path: ROUTES.MENU,
        icon: Coffee,
    },
    {
        id: "reports",
        title: "Reports",
        path: ROUTES.REPORTS,
        icon: ChartColumn,
    },
    {
        id: "settings",
        title: "Settings",
        path: ROUTES.SETTINGS,
        icon: Settings,
    },
];