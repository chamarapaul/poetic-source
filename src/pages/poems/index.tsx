// pages/poems/index.tsx
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import PaginatedPoemList from '@/components/poems/list/PaginatedPoemList';
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
            <Link
              href="/forms"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-800 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse by Form
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/languages"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-800 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse by Language
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
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
