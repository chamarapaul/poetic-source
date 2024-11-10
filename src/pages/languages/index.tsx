// pages/languages/index.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLanguageCategories } from '@/lib/poems';
import type { CategorySummary, ProgrammingLanguage } from '@/lib/types';
import { getLanguageDisplayName } from '@/lib/types';
import Layout from '@/components/Layout';

interface LanguagesPageProps {
    languageCategories: CategorySummary[];
}

const LanguagesPage = ({ languageCategories }: LanguagesPageProps) => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-4">Programming Languages</h1>
                    <p className="text-gray-600 max-w-3xl">
                        Explore how different programming languages lend themselves to poetic expression.
                        Each language brings its own syntax, paradigms, and expressive possibilities to code poetry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {languageCategories.map((category) => (
                        <Card key={category.name} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    {getLanguageDisplayName(category.name as ProgrammingLanguage)}
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
                                    href={`/languages/${category.name}`}
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

// In pages/languages/index.tsx
export async function getStaticProps() {
    try {
        const languageCategories = getLanguageCategories();

        // Simple alphabetical sort
        const sortedCategories = languageCategories.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        // Ensure all data is serializable
        const serializedLanguageCategories = sortedCategories.map(category => ({
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
                languageCategories: serializedLanguageCategories,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return {
            props: {
                languageCategories: [],
            },
            revalidate: 3600,
        };
    }
}

export default LanguagesPage;