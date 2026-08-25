/* eslint-disable react-hooks/set-state-in-effect */
import { Outlet } from "react-router-dom";

import Sidebar from "@renderer/components/layout/Sidebar";
import { SIDEBAR_WIDTH, HEADER_HEIGHT, PAGE_PADDING } from "@renderer/config/layout";
import { useCurrentDateTime } from "@renderer/hooks/useCurrentDateTime";
import { useSettings } from "@renderer/context/SettingsContext";
import { useBusinessDay } from "@renderer/hooks/useBusinessDay";
import { useEffect, useState } from "react";
import { businessDayService } from "@renderer/services/businessDayService";
import BusinessDayClosingDialog from "@renderer/components/businessDay/BusinessDayClosingDialog";

function MainLayout() {

    const { getGreeting, getCurrentDate } = useCurrentDateTime();
    const { business } = useSettings();
    const { status, refresh } = useBusinessDay();
    const [isClosingDialogOpen, setIsClosingDialogOpen] = useState(false);
    const [warningShownForBusinessDay, setWarningShownForBusinessDay] = useState<string | null>(null);

    useEffect(() => {
        if (!status?.shouldWarn || warningShownForBusinessDay === status?.businessDayId) {
            return;
        }

        setWarningShownForBusinessDay(status.businessDayId);
        setIsClosingDialogOpen(true);
    }, [status, warningShownForBusinessDay]);

    async function handleExtendBusinessDay(minutes: number) {
        if (!status) {
            return;
        }

        const newCloseTime = new Date(
            new Date(status.scheduledCloseAt).getTime()
            + minutes * 60 * 1000,
        ).toISOString();

        await businessDayService.extendBusinessDay(
            status.businessDayId,
            newCloseTime,
        );

        setIsClosingDialogOpen(false);

        await refresh();
    }

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
                            {getGreeting()}, {business?.ownerName || "Owner"}!
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

                <BusinessDayClosingDialog
                    open={isClosingDialogOpen}
                    scheduledCloseAt={
                        status?.scheduledCloseAt ?? ""
                    }
                    onExtend={handleExtendBusinessDay}
                    onClose={() =>
                        setIsClosingDialogOpen(false)
                    }
                />
            </div>
        </div>
    );
}

export default MainLayout;