import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
    id: string;
    title: string;
    path: string;
    icon: LucideIcon;
}