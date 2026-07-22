import { useState } from "react";

import {
    AppSettingsDto,
    BusinessSettingsDto,
    ReceiptSettingsDto,
    TaxSettingsDto,
} from "../../../shared/settings";
import { settingsService } from "../services/settingsService";

export function useSettings() {

    const [business, setBusiness] =
        useState<BusinessSettingsDto>();

    const [receipt, setReceipt] =
        useState<ReceiptSettingsDto>();

    const [tax, setTax] =
        useState<TaxSettingsDto>();

    const [app, setApp] =
        useState<AppSettingsDto>();

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

    async function saveBusiness(
        settings: BusinessSettingsDto,
    ) {

        await settingsService.saveBusinessSettings(
            settings,
        );

        setBusiness(settings);

    }

    async function saveReceipt(
        settings: ReceiptSettingsDto,
    ) {

        await settingsService.saveReceiptSettings(
            settings,
        );

        setReceipt(settings);

    }

    async function saveTax(
        settings: TaxSettingsDto,
    ) {

        await settingsService.saveTaxSettings(
            settings,
        );

        setTax(settings);

    }

    async function saveApp(
        settings: AppSettingsDto,
    ) {

        await settingsService.saveAppSettings(
            settings,
        );

        setApp(settings);

    }

    return {
        business,
        receipt,
        tax,
        app,

        load,

        saveBusiness,
        saveReceipt,
        saveTax,
        saveApp,

    };
}