// pages/search.tsx
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import PaginatedPoemList from '@/components/poems/list/PaginatedPoemList';
import { getAllPoems } from '@/lib/poems/poems';
import { searchPoems } from '@/lib/poems/search';
import { Poem } from '@/lib/poems/types';

interface SearchPageProps {
  poems: Poem[];
}

const SearchPage: React.FC<SearchPageProps> = ({ poems }) => {
  const router = useRouter();
  const { q: query } = router.query;
  const searchTerm = typeof query === 'string' ? query : '';

  const searchResults = searchPoems(poems, { searchTerm });

  return (
    <Layout>
      <Container className="py-8">
        <PageHeader
          title="Search Results"
          description={`${searchResults.length} ${
            searchResults.length === 1 ? 'poem' : 'poems'
          } found${searchTerm ? ` for "${searchTerm}"` : ''}`}
        />

        {searchResults.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600 mb-6">
              No poems found matching your search
            </p>
            <Link
              href="/poems"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse all poems
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        ) : (
          <PaginatedPoemList
            poems={searchResults}
            contextType="search"
            contextValue={searchTerm}
          />
        )}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const allPoems = getAllPoems();

    return {
      props: {
        poems: allPoems.map((poem) => ({
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
      },
      revalidate: 3600,
    };
  }
}

export default SearchPage;
