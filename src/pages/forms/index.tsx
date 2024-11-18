// pages/forms/index.tsx
import React from 'react';
import { CategoryPage } from '@/components/CategoryPage';
import { getFormCategories } from '@/lib/poems';
import type { CategorySummary, PoemForm } from '@/lib/types';
import { getFormDisplayName } from '@/lib/cache';

interface FormsPageProps {
    formCategories: CategorySummary[];
}

const FormsPage = ({ formCategories }: FormsPageProps) => {
    return (
        <CategoryPage
            title="Poetic Forms"
            description="Explore how different poetic structures can bring rhythm and meaning to code. Each form offers unique ways to express computational concepts through artistic patterns."
            categories={formCategories}
            getDisplayName={(name) => getFormDisplayName(name as PoemForm)}
            baseUrl="forms"
        />
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