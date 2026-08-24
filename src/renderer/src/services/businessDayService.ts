import { BusinessDayDto } from "src/shared/businessDay";

export const businessDayService = {
    
    async getOpenBusinessDay(): Promise<BusinessDayDto | null> {
        return window.api.businessDay.getOpen();
    },

    async createBusinessDay(
        businessDate: string,
        openedAt: string,
        scheduledCloseAt: string,
    ): Promise<string> {
        return window.api.businessDay.create(
            businessDate,
            openedAt,
            scheduledCloseAt,
        );
    },

    async closeBusinessDay(
        businessDayId: string,
    ): Promise<void> {
        await window.api.businessDay.close(
            businessDayId,
        );
    },
};