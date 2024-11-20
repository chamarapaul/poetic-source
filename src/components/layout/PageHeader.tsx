// components/layout/PageHeader.tsx
import { TYPOGRAPHY } from "@/lib/constants";
import { SPACING } from "@/lib/constants";

interface PageHeaderProps {
    title: string;
    description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => (
    <div className={SPACING.section}>
        <h1 className={TYPOGRAPHY.h1}>{title}</h1>
        {description && <p className={TYPOGRAPHY.body}>{description}</p>}
    </div>
);