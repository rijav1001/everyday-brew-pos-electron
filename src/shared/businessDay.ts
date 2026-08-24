import { BusinessDayStatus } from "./enums";

export interface BusinessDayDto {
    id: string;
    businessDate: string;
    openedAt: string;
    scheduledCloseAt: string;
    actualClosedAt: string | null;
    status: BusinessDayStatus;
}