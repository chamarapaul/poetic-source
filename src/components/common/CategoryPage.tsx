// components/common/CategoryPage.tsx
import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TYPOGRAPHY } from '@/lib/constants';
import type { CategorySummary } from '@/lib/poems/types';

// Shared component for both Forms and Languages pages
interface CategoryPageProps {
  title: string;
  description: string;
  categories: CategorySummary[];
  getDisplayName: (name: string) => string;
  baseUrl: 'forms' | 'languages';
}

export const CategoryPage = ({
  title,
  description,
  categories,
  getDisplayName,
  baseUrl,
}: CategoryPageProps) => {
  return (
    <Layout>
      <Container className="py-6 md:py-8">
        {/* Header */}
        <PageHeader title={title} description={description} />

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
                    <span className={TYPOGRAPHY.small}>
                      {category.count} {category.count === 1 ? 'poem' : 'poems'}
                    </span>
                  </div>
                  <CardDescription className="text-sm md:text-base">
                    {category.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:space-y-2 pt-0">
                <Link href={`/${baseUrl}/${category.name}`} className="w-full">
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
      </Container>
    </Layout>
  );
};
