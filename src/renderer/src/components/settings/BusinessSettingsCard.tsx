/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { BusinessSettingsDto } from "../../../../shared/settings";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface BusinessSettingsCardProps {
    business?: BusinessSettingsDto;
    onSave(
        settings: BusinessSettingsDto,
    ): Promise<void>;
}

function BusinessSettingsCard({
    business,
    onSave,
}: BusinessSettingsCardProps) {

    const [form, setForm] =
        useState<BusinessSettingsDto>({
            name: "",
            ownerName: "",
            gstin: "",
            address: "",
            phone: "",
            businessDayStartTime: "10:00",
            businessDayCloseTime: "00:00",
        });

    useEffect(() => {

        if (business) {
            setForm(business);
        }

    }, [business]);

    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    Business Information
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                <div>

                    <label>
                        Business Name
                    </label>

                    <Input
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })}
                    />

                </div>

                <div>

                    <label>
                        Owner Name
                    </label>

                    <Input
                        value={form.ownerName}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                ownerName: e.target.value,
                            })}
                    />

                </div>

                <div>

                    <label>
                        GSTIN
                    </label>

                    <Input
                        value={form.gstin}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                gstin: e.target.value,
                            })}
                    />

                </div>

                <div>

                    <label>
                        Phone Number
                    </label>

                    <Input
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone: e.target.value,
                            })}
                    />

                </div>

                <div>

                    <label>
                        Address
                    </label>

                    <Input
                        value={form.address}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                address: e.target.value,
                            })}
                    />

                </div>

                <div>

                    <label>
                        Business Day Starts
                    </label>

                    <Input
                        type="time"
                        value={form.businessDayStartTime}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                businessDayStartTime: e.target.value,
                            })}
                    />
                </div>

                <div>

                    <label>
                        Business Day Closes
                    </label>

                    <Input
                        type="time"
                        value={form.businessDayCloseTime}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                businessDayCloseTime: e.target.value,
                            })}
                    />
                </div>

                <p className="text-xs text-(--text-secondary)">
                    Orders after midnight can still belong to the previous
                    business day when the closing time extends past midnight.
                </p>

                <Button
                    className="cursor-pointer"
                    onClick={() => {
                        onSave(form);
                        toast.success("Business information saved successfully!");
                    }}
                >
                    Save Business Information
                </Button>

            </CardContent>

        </Card>

    );
}

export default BusinessSettingsCard;