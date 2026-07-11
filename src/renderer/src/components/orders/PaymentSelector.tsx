import { PAYMENT_METHODS } from "@renderer/config/payment";
import type { PaymentMethod } from "@renderer/types/payment";
import { cn } from "@renderer/lib/utils";

interface PaymentSelectorProps {
    paymentMethod: PaymentMethod;
    onPaymentMethodChange: (payment: PaymentMethod) => void;
}

function PaymentSelector({
    paymentMethod,
    onPaymentMethodChange,
}: PaymentSelectorProps) {

    return (
        <div className="grid grid-cols-2 gap-2">

            {PAYMENT_METHODS.map(method => (
                <button
                    key={method.id}
                    type="button"
                    onClick={() =>
                        onPaymentMethodChange(method.id)
                    }
                    className={cn(
                        "flex w-full items-center justify-between rounded-xl border p-2 transition-all cursor-pointer",

                        paymentMethod === method.id
                            ? "border-accent bg-background"
                            : "border-border hover:border-accent"
                    )}
                >

                    <span>
                        {method.label}
                    </span>

                    <div
                        className={cn(
                            "h-4 w-4 rounded-full border-2",

                            paymentMethod === method.id
                                ? "border-accent bg-accent"
                                : "border-muted-foreground"
                        )}
                    />

                </button>
            ))}

        </div>
    );
}

export default PaymentSelector;