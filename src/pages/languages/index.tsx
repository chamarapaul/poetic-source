// pages/languages/index.tsx
import React from 'react';
import { CategoryPage } from '@/components/common/CategoryPage';
import { getLanguageCategories } from '@/lib/poems';
import type { CategorySummary, ProgrammingLanguage } from '@/lib/types';
import { getLanguageDisplayName } from '@/lib/cache';

interface LanguagesPageProps {
    languageCategories: CategorySummary[];
}

const LanguagesPage = ({ languageCategories }: LanguagesPageProps) => {
    return (
        <CategoryPage
            title="Programming Languages"
            description="Explore how different programming languages lend themselves to poetic expression. Each language brings its own syntax, paradigms, and expressive possibilities to code poetry."
            categories={languageCategories}
            getDisplayName={(name) => getLanguageDisplayName(name as ProgrammingLanguage)}
            baseUrl="languages"
        />
    );
};

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