/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    AppSettingsDto,
    BusinessSettingsDto,
    ReceiptSettingsDto,
    TaxSettingsDto,
} from "src/shared/settings";

import { settingsService } from "@renderer/services/settingsService";

interface SettingsContextValue {
    business?: BusinessSettingsDto;
    receipt?: ReceiptSettingsDto;
    tax?: TaxSettingsDto;
    app?: AppSettingsDto;

    saveBusiness(settings: BusinessSettingsDto): Promise<void>;
    saveReceipt(settings: ReceiptSettingsDto): Promise<void>;
    saveTax(settings: TaxSettingsDto): Promise<void>;
    saveApp(settings: AppSettingsDto): Promise<void>;

    backupDatabase(): Promise<void>;
    restoreDatabase(): Promise<void>;
}

const SettingsContext =
    createContext<SettingsContextValue | null>(null);

export function SettingsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [business, setBusiness] = useState<BusinessSettingsDto>();

    const [receipt, setReceipt] = useState<ReceiptSettingsDto>();

    const [tax, setTax] = useState<TaxSettingsDto>();

    const [app, setApp] = useState<AppSettingsDto>();

    async function load() {
        const [
            businessSettings,
            receiptSettings,
            taxSettings,
            appSettings,
        ] = await Promise.all([
            settingsService.getBusinessSettings(),
            settingsService.getReceiptSettings(),
            settingsService.getTaxSettings(),
            settingsService.getAppSettings(),
        ]);

        setBusiness(businessSettings);
        setReceipt(receiptSettings);
        setTax(taxSettings);
        setApp(appSettings);
    }

    useEffect(() => {
        load();
    }, []);

    async function saveBusiness(settings: BusinessSettingsDto) {
        await settingsService.saveBusinessSettings(settings);
        setBusiness(settings);
    }

    async function saveReceipt(settings: ReceiptSettingsDto) {
        await settingsService.saveReceiptSettings(settings);
        setReceipt(settings);
    }

    async function saveTax(settings: TaxSettingsDto) {
        await settingsService.saveTaxSettings(settings);
        setTax(settings);
    }

    async function saveApp(settings: AppSettingsDto) {
        await settingsService.saveAppSettings(settings);
        setApp(settings);
    }

    async function backupDatabase() {
        await settingsService.backupDatabase();
    }

    async function restoreDatabase() {
        await settingsService.restoreDatabase();
    }

    return (
        <SettingsContext.Provider
            value={{
                business,
                receipt,
                tax,
                app,
                saveBusiness,
                saveReceipt,
                saveTax,
                saveApp,
                backupDatabase,
                restoreDatabase,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error(
            "useSettings must be used inside SettingsProvider.",
        );
    }

    return context;
}