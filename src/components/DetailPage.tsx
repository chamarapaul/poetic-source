// components/DetailPage.tsx
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Shared component for both Form and Language detail pages
interface DetailPageProps {
    title: string;
    description: string;
    cards: {
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        title: string;
        content: React.ReactNode;
    }[];
    children?: React.ReactNode;
}

export const DetailPage: React.FC<DetailPageProps> = ({
    title,
    description,
    cards,
    children
}) => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-3xl font-bold mb-4">{title}</h1>
                    <p className="text-gray-600 text-base md:text-lg">
                        {description}
                    </p>
                </div>

                {/* Info Cards */}
                <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 mb-8 md:mb-12">
                    {cards.map((card, index) => (
                        <Card key={index}>
                            <CardHeader className="p-4 md:p-6">
                                <CardTitle className="flex items-center text-lg md:text-xl">
                                    <card.icon className="w-5 h-5 mr-2 shrink-0" />
                                    {card.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:space-y-2 pt-0">
                                {card.content}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Additional content (example section for forms, poems list) */}
                {children}
            </div>
        </Layout>
    );
};