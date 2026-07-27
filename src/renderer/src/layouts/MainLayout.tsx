import { Outlet } from "react-router-dom";

import Sidebar from "@renderer/components/layout/Sidebar";
import { SIDEBAR_WIDTH, HEADER_HEIGHT, PAGE_PADDING } from "@renderer/config/layout";
import { useCurrentDateTime } from "@renderer/hooks/useCurrentDateTime";

function MainLayout() {

    const { getGreeting, getCurrentDate } = useCurrentDateTime();

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside style={{ width: SIDEBAR_WIDTH }} className="border-r border-border bg-sidebar">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header style={{ height: HEADER_HEIGHT }} className="flex items-center justify-between border-b border-border bg-(--surface) px-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-(--text-primary)">
                            {getGreeting()}, Dhims
                        </h1>
                        <p className="mt-1 text-sm text-(--text-secondary)">
                            Welcome back.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg text-(--text-secondary)">
                            {getCurrentDate()}
                        </p>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ padding: PAGE_PADDING }} className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;