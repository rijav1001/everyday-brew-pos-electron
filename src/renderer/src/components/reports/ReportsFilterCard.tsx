import { ReportFilterDto } from "src/shared/report";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { ReportRange } from "../../../../shared/ReportRange";
import { Card, CardContent } from "../ui/card";
import { CalendarDays } from "lucide-react";

interface ReportFiltersProps {
    range: ReportRange;
    filter: ReportFilterDto;
    onRangeChange: (range: ReportRange) => void;
    onFilterChange: (filter: ReportFilterDto) => void;
    onGenerate: () => void;
    exportCsv: () => void;
    printReport: () => void;
}

function ReportsFilterCard({
    range,
    filter,
    onRangeChange,
    onFilterChange,
    onGenerate,
    exportCsv,
    printReport
}: ReportFiltersProps) {
    return (
        <Card>
            <CardContent className="pt-6">

                <div className="flex flex-wrap items-end gap-4">

                    <div className="w-52">
                        <Select
                            value={range}
                            onValueChange={(value) =>
                                onRangeChange(value as ReportRange)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent className="bg-white">
                                <SelectItem value={ReportRange.TODAY}>
                                    Today
                                </SelectItem>

                                <SelectItem value={ReportRange.YESTERDAY}>
                                    Yesterday
                                </SelectItem>

                                <SelectItem value={ReportRange.LAST_7_DAYS}>
                                    Last 7 Days
                                </SelectItem>

                                <SelectItem value={ReportRange.THIS_MONTH}>
                                    This Month
                                </SelectItem>

                                <SelectItem value={ReportRange.CUSTOM}>
                                    Custom
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        className="w-44"
                        type="date"
                        disabled={range !== ReportRange.CUSTOM}
                        value={filter.startDate}
                        onChange={(e) =>
                            onFilterChange({
                                ...filter,
                                startDate: e.target.value,
                            })
                        }
                    />

                    <Input
                        className="w-44"
                        type="date"
                        disabled={range !== ReportRange.CUSTOM}
                        value={filter.endDate}
                        onChange={(e) =>
                            onFilterChange({
                                ...filter,
                                endDate: e.target.value,
                            })
                        }
                    />

                    <div className="flex items-center gap-2">
                        <Button onClick={onGenerate} className="cursor-pointer">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Generate Report
                        </Button>

                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            onClick={exportCsv}
                        >
                            Export CSV
                        </Button>

                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            onClick={printReport}
                        >
                            Print
                        </Button>
                    </div>

                </div>

            </CardContent>
        </Card>
    );
}

export default ReportsFilterCard;