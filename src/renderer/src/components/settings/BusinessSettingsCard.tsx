/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { BusinessSettingsDto } from "../../../../shared/settings";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

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
            gstin: "",
            address: "",
            phone: "",
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

                <Button
                    className="cursor-pointer"
                    onClick={() => onSave(form)}
                >
                    Save Business Information
                </Button>

            </CardContent>

        </Card>

    );
}

export default BusinessSettingsCard;