// pages/poems/index.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getFormCategories, getLanguageCategories } from '../../lib/poems';
import type { CategorySummary } from '../../lib/types';
import Layout from '../../components/Layout';

interface BrowsePageProps {
  formCategories: CategorySummary[];
  languageCategories: CategorySummary[];
}

const BrowsePage = ({ formCategories, languageCategories }: BrowsePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('form');

  const renderCategoryGrid = (categories: CategorySummary[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.name} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              <span className="text-sm text-gray-500">
                {category.count} {category.count === 1 ? 'poem' : 'poems'}
              </span>
            </CardTitle>
            <CardDescription>
              {category.description || `Poems in ${category.name}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link 
              href={`/poems/${selectedCategory}/${category.name.toLowerCase()}`}
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
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Poems</h1>
        
        <Tabs defaultValue="form" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="form"
              onClick={() => setSelectedCategory('form')}
            >
              By Poetic Form
            </TabsTrigger>
            <TabsTrigger 
              value="language"
              onClick={() => setSelectedCategory('language')}
            >
              By Programming Language
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-6">
            {renderCategoryGrid(formCategories)}
          </TabsContent>

          <TabsContent value="language" className="mt-6">
            {renderCategoryGrid(languageCategories)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const formCategories = getFormCategories();
    const languageCategories = getLanguageCategories();

    // Ensure all data is serializable
    const serializedFormCategories = formCategories.map(category => ({
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

    const serializedLanguageCategories = languageCategories.map(category => ({
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
        languageCategories: serializedLanguageCategories,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        formCategories: [],
        languageCategories: [],
      },
      revalidate: 3600,
    };
  }
}

export default BrowsePage;