export function useCurrentDateTime() {
    function getGreeting(): string {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return "Good Morning";
        }

        if (hour >= 12 && hour < 17) {
            return "Good Afternoon";
        }

        return "Good Evening";
    }

    function getCurrentDate(): string {
        return new Intl.DateTimeFormat("en-IN", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date());
    }

    return {
        getGreeting,
        getCurrentDate,
    };
}