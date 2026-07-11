import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

function PageHeader({
    title,
    description,
    action,
}: PageHeaderProps) {
    return (
        <div className="mb-8 flex items-start justify-between">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 text-sm text-(--text-secondary)">
                        {description}
                    </p>
                )}
            </div>

            {action && <div>{action}</div>}
        </div>
    );
}

export default PageHeader;