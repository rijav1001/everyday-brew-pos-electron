import { navigationItems } from "@renderer/config/navigation";

import SidebarItem from "./SidebarItem";
import { APP_VERSION } from "@renderer/config/app";
import everydayBrewLogo from "../../../../../resources/everydayBrewLogo.png";

function Sidebar() {
    return (
        <aside className="flex h-full flex-col bg-sidebar">
            <div className="border-b border-white/10 px-6 py-8">
                <img
                    src={everydayBrewLogo}
                    alt="Everyday Brew"
                    className="mx-auto h-auto w-44 object-contain"
                />
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
                {navigationItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </nav>

            <div className="border-t border-white/10 p-5">
                <p className="text-xs text-stone-500">
                    Version {APP_VERSION}
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;