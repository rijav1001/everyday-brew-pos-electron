/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { TaxSettingsDto } from "../../../../shared/settings";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TaxSettingsCardProps {
    tax?: TaxSettingsDto;
    onSave(
        settings: TaxSettingsDto,
    ): Promise<void>;
}

function TaxSettingsCard({
    tax,
    onSave
}: TaxSettingsCardProps) {

    const [form, setForm] =
        useState<TaxSettingsDto>({
            gstPercent: 18,
        });

    useEffect(() => {

        if (tax) {
            setForm(tax);
        }

    }, [tax]);

    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    Tax Settings
                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="space-y-2">

                    <label>
                        GST Percentage
                    </label>

                    <Input
                        type="number"
                        min={0}
                        max={100}
                        value={form.gstPercent}
                        onChange={(e) =>
                            setForm({
                                gstPercent: Number(e.target.value),
                            })}
                    />

                </div>

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="text-sm font-medium">
                        Pricing Configuration
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Menu prices are treated as <strong>GST-inclusive</strong>.
                        GST is calculated internally for reporting and receipts.
                    </p>

                </div>

                <Button
                    className="cursor-pointer"
                    onClick={() => onSave(form)}
                >
                    Save Tax Settings
                </Button>

            </CardContent>

        </Card>

    );
}

export default TaxSettingsCard;