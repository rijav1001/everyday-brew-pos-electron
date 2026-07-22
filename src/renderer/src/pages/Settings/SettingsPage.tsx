/* eslint-disable react-hooks/exhaustive-deps */
import AboutCard from "@renderer/components/settings/AboutCard";
import BackupRestoreCard from "@renderer/components/settings/BackupRestoreCard";
import BusinessSettingsCard from "@renderer/components/settings/BusinessSettingsCard";
import ReceiptSettingsCard from "@renderer/components/settings/ReceiptSettingsCard";
import TaxSettingsCard from "@renderer/components/settings/TaxSettingsCard";
import { useSettings } from "@renderer/hooks/useSettings";
import { useEffect } from "react";

function SettingsPage() {
    const settings = useSettings();

    useEffect(() => {

        settings.load();

    }, []);

    return (
        <div className="space-y-6">

            <BusinessSettingsCard
                business={settings.business}
                onSave={settings.saveBusiness}
            />

            <ReceiptSettingsCard
                receipt={settings.receipt}
                onSave={settings.saveReceipt}
            />

            <TaxSettingsCard
                tax={settings.tax}
                onSave={settings.saveTax}
            />

            <BackupRestoreCard
                onBackup={settings.backupDatabase}
                onRestore={settings.restoreDatabase}
            />

            <AboutCard />

        </div>
    );
}

export default SettingsPage;