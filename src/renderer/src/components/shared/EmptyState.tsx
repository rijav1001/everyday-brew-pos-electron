import type { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: ReactNode;
}

function EmptyState({ title, description, icon }: EmptyStateProps) {
    return (
        <div className="flex h-full flex-col items-center justify-center text-center">
            {icon && <div className="mb-4">{icon}</div>}

            <h3 className="text-lg font-semibold text-(--text-primary)">
                {title}
            </h3>

            <p className="mt-2 max-w-xs text-sm text-(--text-secondary)">
                {description}
            </p>
        </div>
    );
}

export default EmptyState;