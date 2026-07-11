import { NavLink } from "react-router-dom";
import { cn } from "@renderer/lib/utils";

import type { NavigationItem } from "@renderer/types/navigation";

interface SidebarItemProps {
    item: NavigationItem;
}

function SidebarItem({ item }: SidebarItemProps) {
    const Icon = item.icon;

    return (
        <NavLink to={item.path}>
            {({ isActive }) => (
                <div
                    className={cn(
                        "group relative flex h-12 items-center gap-3 rounded-xl px-4 transition-all duration-200",
                        isActive
                        ? "bg-[#B68A4C]/15 text-white shadow-[0_4px_12px_rgba(182,138,76,0.12)]"
                        : "text-(--sidebar-text) hover:bg-white/5 hover:text-(--sidebar-text-hover)"
                    )}
                >
                    {isActive && (
                        <div className="absolute left-0 h-7 w-1 rounded-r-full bg-accent" />
                    )}

                    <Icon size={18} className="transition-colors duration-200" />

                    <span className="text-sm font-medium">
                        {item.title}
                    </span>
                </div>
            )}
        </NavLink>
    );
}

export default SidebarItem;