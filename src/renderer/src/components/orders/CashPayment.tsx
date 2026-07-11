import { calculateChange } from "@renderer/utils/payment";
import { Input } from "../ui/input";

interface CashPaymentProps {
    grandTotal: number;
    received: number | null;
    onChange: (value: number | null) => void;
}

function CashPayment({ grandTotal, received, onChange }: CashPaymentProps) {
    const change = calculateChange(grandTotal, received);

    return(
        <div className="mt-4 space-y-4 rounded-xl border border-border bg-background p-4">
            <div>
                <label className="mb-2 block text-sm font-medium text-(--text-primary)">
                    Amount Received
                </label>
                <Input 
                    type="number"
                    inputMode="decimal"
                    min={0}
                    placeholder="Enter received amount"
                    value={received ?? ""}
                    onChange={(event) => {
                        const value = event.target.value;

                        onChange(value === "" ? null : Number(value));
                    }}
                />
            </div>

            <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm font-medium text-(--text-secondary)">
                    Change
                </span>

                <span className="text-lg font-bold text-(--text-primary)">
                    ₹{change.toFixed(2)}
                </span>
            </div>
        </div>
    );
}

export default CashPayment;