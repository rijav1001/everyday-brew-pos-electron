import { BrowserWindow, dialog } from "electron";
import { ReportChartDto, ReportFilterDto } from "../../shared/report";
import { ReportSummaryDto } from "../../shared/report";
import { ReportExportDto } from "../../shared/reportExport";
import { OrderRepository } from "../repositories/OrderRepository";
import fs from "node:fs/promises";

export class ReportsService {
    constructor(
        private readonly repository: OrderRepository,
    ) {}

    getSummary(filter: ReportFilterDto): ReportSummaryDto {
        return this.repository.getReportSummary(
            filter.startDate,
            filter.endDate
        );
    }

    getChart(filter: ReportFilterDto): ReportChartDto[] {
        return this.repository.getReportChart(
            filter.startDate,
            filter.endDate
        );
    }

    getPaymentBreakdown(filter: ReportFilterDto) {
        return this.repository.getPaymentBreakdown(
            filter.startDate,
            filter.endDate
        );
    }

    getTopSellingItems(filter: ReportFilterDto) {
        return this.repository.getTopSellingItems(
            filter.startDate,
            filter.endDate
        );
    }

    getOrderHistory(filter: ReportFilterDto) {
        return this.repository.getOrderHistory(
            filter.startDate,
            filter.endDate
        );
    }

    async saveCsv(
        report: ReportExportDto
    ) {

        const result =
            await dialog.showSaveDialog({

                defaultPath: report.fileName,

                filters: [
                    {
                        name: "CSV",
                        extensions: ["csv"],
                    },
                ],

            });

        if (result.canceled || !result.filePath) {
            return;
        }

        await fs.writeFile(
            result.filePath,
            report.content,
        );
    }

    printReport() {
        BrowserWindow
            .getFocusedWindow()
            ?.webContents.print({

                silent: false,

                printBackground: true,

            });
    }
}