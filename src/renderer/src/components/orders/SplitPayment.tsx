import { calculateRemaining, isSplitPaymentValid } from "@renderer/utils/payment";
import { Input } from "../ui/input";

interface SplitPaymentProps {
    grandTotal: number;
    cash: number | null;
    upi: number | null;
    onCashChange: (value: number | null) => void;
    onUpiChange: (value: number | null) => void;
}

function SplitPayment({ grandTotal, cash, upi, onCashChange, onUpiChange }: SplitPaymentProps) {
    const remaining = calculateRemaining(grandTotal, cash, upi);

    const isValid = isSplitPaymentValid(grandTotal, cash, upi);

    return(
        <div className="mt-4 space-y-4 rounded-xl border border-border bg-background p-4">
            <div>
                <label className="mb-2 block text-sm font-medium text-(--text-primary)">
                    Cash Amount
                </label>

                <Input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    placeholder="Enter cash amount"
                    value={cash ?? ""}
                    onChange={(event) => {
                        const value = event.target.value;

                        onCashChange(value === "" ? null : Number(value));
                    }}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-(--text-primary)">
                    UPI Amount
                </label>

                <Input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    placeholder="Enter UPI amount"
                    value={upi ?? ""}
                    onChange={(event) => {
                        const value = event.target.value;

                        onUpiChange(value === "" ? null : Number(value));
                    }}
                />
            </div>

            <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-(--text-secondary)">
                        Remaining
                    </span>

                    <span
                        className={`text-lg font-bold ${
                            isValid
                                ? "text-green-600"
                                : "text-(--text-primary)"
                        }`}
                    >
                        ₹{remaining.toFixed(2)}
                    </span>
                </div>

                {isValid && (
                    <p className="mt-2 text-sm text-green-600">
                        Split payment complete.
                    </p>
                )}
            </div>
        </div>
    );
}

export default SplitPayment;