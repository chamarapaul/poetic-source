// pages/forms/index.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFormCategories } from '@/lib/poems';
import type { CategorySummary, PoemForm } from '@/lib/types';
import { getFormDisplayName } from '@/lib/cache';
import Layout from '@/components/Layout';

interface FormsPageProps {
    formCategories: CategorySummary[];
}

const FormsPage = ({ formCategories }: FormsPageProps) => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-4">Poetic Forms</h1>
                    <p className="text-gray-600 max-w-3xl">
                        Explore how different poetic structures can bring rhythm and meaning to code.
                        Each form offers unique ways to express computational concepts through artistic patterns.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formCategories.map((category) => (
                        <Card key={category.name} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    {getFormDisplayName(category.name as PoemForm)}
                                    <span className="text-sm text-gray-500">
                                        {category.count} {category.count === 1 ? 'poem' : 'poems'}
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    {category.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link
                                    href={`/forms/${category.name}`}
                                    passHref
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full"
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

// In pages/forms/index.tsx
export async function getStaticProps() {
    try {
        const formCategories = getFormCategories();

        // Simple alphabetical sort, with freeverse at the end
        const sortedCategories = formCategories.sort((a, b) => {
            if (a.name === 'freeverse') return 1;
            if (b.name === 'freeverse') return -1;
            return a.name.localeCompare(b.name);
        });

        // Ensure all data is serializable
        const serializedFormCategories = sortedCategories.map(category => ({
            ...category,
            description: category.description || null,
            poems: category.poems.map(poem => ({
                ...poem,
                notes: {
                    composition: poem.notes.composition || null,
                    technical: poem.notes.technical || null,
                    philosophical: poem.notes.philosophical || null
                }
            }))
        }));

        return {
            props: {
                formCategories: serializedFormCategories,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return {
            props: {
                formCategories: [],
            },
            revalidate: 3600,
        };
    }
}

export default FormsPage;