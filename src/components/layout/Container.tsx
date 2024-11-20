// components/layout/Container.tsx
export const Container = ({ children, className = "" }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`max-w-4xl mx-auto px-4 ${className}`}>
        {children}
    </div>
);