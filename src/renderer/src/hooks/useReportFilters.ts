import { useMemo, useState } from "react";

import { ReportFilterDto } from "src/shared/report";
import { ReportRange } from "../../../shared/ReportRange";

function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
}

export function useReportFilters() {
    const today = useMemo(() => new Date(), []);

    const [range, setRange] = useState(ReportRange.TODAY);

    const [filter, setFilter] = useState<ReportFilterDto>({
        startDate: formatDate(today),
        endDate: formatDate(today),
    });

    function updateRange(selected: ReportRange) {
        const now = new Date();

        let start = new Date(now);
        let end = new Date(now);

        switch (selected) {
            case ReportRange.TODAY:
                break;

            case ReportRange.YESTERDAY:
                start.setDate(start.getDate() - 1);
                end = new Date(start);
                break;

            case ReportRange.LAST_7_DAYS:
                start.setDate(start.getDate() - 6);
                break;

            case ReportRange.THIS_MONTH:
                start = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    1,
                );
                break;

            case ReportRange.CUSTOM:
                return setRange(selected);
        }

        setRange(selected);

        setFilter({
            startDate: formatDate(start),
            endDate: formatDate(end),
        });
    }

    return {
        range,
        filter,
        updateRange,
        setFilter,
    };
}