// pages/poems/index.tsx
import React from 'react';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import PaginatedPoemList from '@/components/poems/list/PaginatedPoemList';
import { ActionButton } from '@/components/shared/buttons/action-buttons';
import { getAllPoems } from '@/lib/poems/poems';
import { Poem } from '@/lib/poems/types';

interface BrowsePageProps {
  poems: Poem[];
  totalPoems: number;
}

const BrowsePage = ({ poems, totalPoems }: BrowsePageProps) => {
  return (
    <Layout>
      <Container className="py-8">
        <PageHeader
          title="Browse Poems"
          description={`Exploring ${totalPoems} poems across multiple languages and forms`}
        />

        <PaginatedPoemList poems={poems} />

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Looking for something specific?</p>
          <div className="flex justify-center gap-4">
            <ActionButton href="/forms" variant="secondary">
              Browse by Form
            </ActionButton>
            <ActionButton href="/languages" variant="secondary">
              Browse by Language
            </ActionButton>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const allPoems = getAllPoems();

    // Sort by date, newest first
    const sortedPoems = allPoems.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      props: {
        totalPoems: allPoems.length,
        poems: sortedPoems.map((poem) => ({
          ...poem,
          notes: {
            composition: poem.notes.composition || null,
            technical: poem.notes.technical || null,
            philosophical: poem.notes.philosophical || null,
          },
        })),
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        poems: [],
        totalPoems: 0,
      },
      revalidate: 3600,
    };
  }
}

export default BrowsePage;
