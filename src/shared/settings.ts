export interface SettingDto {
    key: string;
    value: string;
}

export interface BusinessSettingsDto {
    name: string;
    gstin: string;
    address: string;
    phone: string;
}

export interface ReceiptSettingsDto {
    autoPrint: boolean;
    paperWidth: 58 | 80;
    header: string;
    footer: string;
}

export interface TaxSettingsDto {
    gstPercent: number;
}

export type AppTheme = 
    | "light"
    | "dark"
    | "system";

export interface AppSettingsDto {
    theme: AppTheme;
}