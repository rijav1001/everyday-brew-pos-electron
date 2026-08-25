import { BusinessDayService } from "./BusinessDayService";

export class BusinessDayManager {
    constructor(
        private readonly businessDayService: BusinessDayService,
    ) {}

    getStatus(): {
        businessDayId: string;
        scheduledCloseAt: string;
        shouldWarn: boolean;
        hasExpired: boolean;
    } | null {
        const businessDay = this.businessDayService.getOpenBusinessDay();

        if (!businessDay) {
            return null;
        }

        const now = new Date();
        const scheduledClose =
            new Date(businessDay.scheduledCloseAt);

        const warningTime = new Date(
            scheduledClose.getTime() - 15 * 60 * 1000,
        );

        return {
            businessDayId: businessDay.id,
            scheduledCloseAt: businessDay.scheduledCloseAt,
            shouldWarn:
                now >= warningTime &&
                now < scheduledClose,
            hasExpired:
                now >= scheduledClose,
        };
    }

    extend(
        businessDayId: string,
        scheduledCloseAt: string,
    ): void {
        this.businessDayService.extendBusinessDay(
            businessDayId,
            scheduledCloseAt,
        );
    }
}