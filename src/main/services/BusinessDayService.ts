import { BusinessDayDto } from "../../shared/businessDay";
import { BusinessDayRepository } from "../repositories/BusinessDayRepository";
import { SettingsRepository } from "../repositories/SettingsRepository";

export class BusinessDayService {
    constructor(
        private readonly businessDayRepository: BusinessDayRepository,
        private readonly settingsRepository: SettingsRepository,
    ) {}

    getOpenBusinessDay(): BusinessDayDto | null {
        return this.businessDayRepository.getOpenBusinessDay();
    }

    async getOrCreateCurrentBusinessDay(): Promise<BusinessDayDto> {
        const existing =
            this.businessDayRepository.getOpenBusinessDay();

        if (existing) {
            return existing;
        }

        const business =
            this.settingsRepository.getBusinessSettings();

        const timing = this.getBusinessDayTiming(
            business.businessDayStartTime,
            business.businessDayCloseTime,
        );

        const id =
            this.businessDayRepository.createBusinessDay(
                timing.businessDate,
                timing.openedAt,
                timing.scheduledCloseAt,
            );

        const created =
            this.businessDayRepository.getOpenBusinessDay();

        if (!created || created.id !== id) {
            throw new Error(
                "Failed to create business day.",
            );
        }

        return created;
    }

    createBusinessDay(
        businessDate: string,
        openedAt: string,
        scheduledCloseAt: string,
    ): string {
        return this.businessDayRepository.createBusinessDay(
            businessDate,
            openedAt,
            scheduledCloseAt,
        );
    }

    closeBusinessDay(businessDayId: string): void {
        this.businessDayRepository.closeBusinessDay(
            businessDayId,
        );
    }

    getBusinessDayTiming(
        businessDayStartTime: string,
        businessDayCloseTime: string,
        now = new Date(),
    ): {
        businessDate: string;
        openedAt: string;
        scheduledCloseAt: string;
    } {
        const [startHour, startMinute] =
            businessDayStartTime.split(":").map(Number);

        const [closeHour, closeMinute] =
            businessDayCloseTime.split(":").map(Number);

        const current = new Date(now);

        const startToday = new Date(current);
        startToday.setHours(
            startHour,
            startMinute,
            0,
            0,
        );

        const closeToday = new Date(current);
        closeToday.setHours(
            closeHour,
            closeMinute,
            0,
            0,
        );

        // Closing time is after midnight.
        if (closeToday <= startToday) {
            closeToday.setDate(
                closeToday.getDate() + 1,
            );
        }

        // Before today's business-day start:
        // this belongs to yesterday's business day.
        if (current < startToday) {
            startToday.setDate(
                startToday.getDate() - 1,
            );

            closeToday.setDate(
                closeToday.getDate() - 1,
            );
        }

        return {
            businessDate: this.formatDate(startToday),
            openedAt: startToday.toISOString(),
            scheduledCloseAt: closeToday.toISOString(),
        };
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(
            date.getMonth() + 1,
        ).padStart(2, "0");
        const day = String(
            date.getDate(),
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }
}