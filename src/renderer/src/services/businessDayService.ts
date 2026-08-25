import { BusinessDayDto } from "src/shared/businessDay";

export interface BusinessDayStatus {
    businessDayId: string;
    scheduledCloseAt: string;
    shouldWarn: boolean;
    hasExpired: boolean;
}

export const businessDayService = {
    
    async getOpenBusinessDay(): Promise<BusinessDayDto | null> {
        return window.api.businessDay.getOpen();
    },

    async createBusinessDay(businessDate: string, openedAt: string, scheduledCloseAt: string): Promise<string> {
        return window.api.businessDay.create(
            businessDate,
            openedAt,
            scheduledCloseAt,
        );
    },

    async closeBusinessDay(businessDayId: string): Promise<void> {
        await window.api.businessDay.close(
            businessDayId,
        );
    },

    async extendBusinessDay(businessDayId: string, scheduledCloseAt: string): Promise<void> {
        await window.api.businessDay.extend(
            businessDayId,
            scheduledCloseAt,
        );
    },

    async getStatus(): Promise<BusinessDayStatus | null> {
        return window.api.businessDay.getStatus();
    },
};