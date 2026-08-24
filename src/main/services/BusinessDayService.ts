import { BusinessDayDto } from "../../shared/businessDay";
import { BusinessDayRepository } from "../repositories/BusinessDayRepository";

export class BusinessDayService {
    constructor(
        private readonly businessDayRepository: BusinessDayRepository,
    ) {}

    getOpenBusinessDay(): BusinessDayDto | null {
        return this.businessDayRepository.getOpenBusinessDay();
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
}