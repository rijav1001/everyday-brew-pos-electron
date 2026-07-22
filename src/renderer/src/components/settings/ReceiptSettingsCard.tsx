/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { ReceiptSettingsDto } from "../../../../shared/settings";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ReceiptSettingsCardProps {
    receipt?: ReceiptSettingsDto;
    onSave(
        settings: ReceiptSettingsDto,
    ): Promise<void>;
}

function ReceiptSettingsCard({
    receipt,
    onSave
}: ReceiptSettingsCardProps) {

    const [form, setForm] =
        useState<ReceiptSettingsDto>({
            autoPrint: true,
            paperWidth: 80,
            header: "",
            footer: "",
        });

    useEffect(() => {

        if (receipt) {

            setForm(receipt);

        }

    }, [receipt]);

    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    Receipt Settings
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex items-center justify-between">

                    <div>

                        <label>
                            Auto Print
                        </label>

                        <p className="text-sm text-muted-foreground">
                            Automatically print receipts after checkout.
                        </p>

                    </div>

                    <Switch
                        checked={form.autoPrint}
                        onCheckedChange={(checked) =>
                            setForm({
                                ...form,
                                autoPrint: checked,
                            })}
                    />

                </div>

                <div className="space-y-2">

                    <label>
                        Paper Width
                    </label>

                    <Select
                        value={String(form.paperWidth)}
                        onValueChange={(value) =>
                            setForm({
                                ...form,
                                paperWidth: Number(value) as 58 | 80,
                            })}
                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="58">
                                58 mm
                            </SelectItem>

                            <SelectItem value="80">
                                80 mm
                            </SelectItem>

                        </SelectContent>

                    </Select>

                </div>

                <div className="space-y-2">

                    <label>
                        Receipt Header
                    </label>

                    <Input
                        value={form.header}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                header: e.target.value,
                            })}
                    />

                </div>

                <div className="space-y-2">

                    <label>
                        Receipt Footer
                    </label>

                    <Input
                        value={form.footer}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                footer: e.target.value,
                            })}
                    />

                </div>

                <Button
                    className="cursor-pointer"
                    onClick={() => onSave(form)}
                >
                    Save Receipt Settings
                </Button>

            </CardContent>

        </Card>

    );
}

export default ReceiptSettingsCard;