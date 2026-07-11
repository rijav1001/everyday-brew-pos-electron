import { navigationItems } from "@renderer/config/navigation";

import SidebarItem from "./SidebarItem";
import { APP_VERSION } from "@renderer/config/app";

function Sidebar() {
    return (
        <aside className="flex h-full flex-col bg-sidebar">
            <div className="border-b border-white/10 px-6 py-8">
                <div className="mb-5 flex justify-center text-3xl">
                    ☕
                </div>

                <h1 className="text-center text-2xl font-extrabold tracking-[0.25em] text-white leading-none">
                    EVERYDAY
                </h1>

                <h2 className="mt-1 text-center text-2xl font-extrabold tracking-[0.25em] text-white leading-none">
                    BREW
                </h2>
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