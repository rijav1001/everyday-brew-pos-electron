/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { businessDayService, BusinessDayStatus } from "@renderer/services/businessDayService";

const CHECK_INTERVAL = 60 * 1000;

export function useBusinessDay() {
    const [status, setStatus] = useState<BusinessDayStatus | null>(null);

    async function checkStatus() {
        const current =
            await businessDayService.getStatus();

        setStatus(current);
    }

    useEffect(() => {
        checkStatus();

        const interval = window.setInterval(
            checkStatus,
            CHECK_INTERVAL,
        );

        return () => {
            window.clearInterval(interval);
        };
    }, []);

    return {
        status,
        refresh: checkStatus,
    };
}