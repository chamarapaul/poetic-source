// components/CategoryPage.tsx
import React from 'react';
import type { CategorySummary } from '@/lib/types';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Shared component for both Forms and Languages pages
interface CategoryPageProps {
    title: string;
    description: string;
    categories: CategorySummary[];
    getDisplayName: (name: string) => string;
    baseUrl: 'forms' | 'languages';
}

export const CategoryPage = ({ title, description, categories, getDisplayName, baseUrl }: CategoryPageProps) => {
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

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <Card
                            key={category.name}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader className="p-4 md:p-6">
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <CardTitle className="text-lg md:text-xl">
                                            {getDisplayName(category.name)}
                                        </CardTitle>
                                        <span className="text-sm text-gray-500">
                                            {category.count} {category.count === 1 ? 'poem' : 'poems'}
                                        </span>
                                    </div>
                                    <CardDescription className="text-sm md:text-base">
                                        {category.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 md:space-y-2 pt-0">
                                <Link
                                    href={`/${baseUrl}/${category.name}`}
                                    className="w-full"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full py-2 h-auto"
                                        disabled={category.count === 0}
                                    >
                                        {category.count > 0 ? 'View Poems' : 'Coming Soon'}
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};