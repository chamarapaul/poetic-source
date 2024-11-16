// pages/poems/index.tsx
import React from 'react';
import Link from 'next/link';
import { getAllPoems } from '@/lib/poems';
import { Poem } from '@/lib/types';
import Layout from '@/components/Layout';
import PaginatedPoemList from '@/components/PaginatedPoemList';

interface BrowsePageProps {
  poems: Poem[];
  totalPoems: number;
}

const BrowsePage = ({ poems, totalPoems }: BrowsePageProps) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Browse Poems</h1>
          <p className="text-gray-600 max-w-3xl">
            Exploring {totalPoems} poems across multiple languages and forms
          </p>
        </div>

        <PaginatedPoemList poems={poems} />

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Looking for something specific?</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/forms"
              className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              Browse by Form
            </Link>
            <Link
              href="/languages"
              className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              Browse by Language
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const allPoems = getAllPoems();

    // Sort by date, newest first
    const sortedPoems = allPoems.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      props: {
        totalPoems: allPoems.length,
        poems: sortedPoems.map(poem => ({
          ...poem,
          notes: {
            composition: poem.notes.composition || null,
            technical: poem.notes.technical || null,
            philosophical: poem.notes.philosophical || null
          }
        }))
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