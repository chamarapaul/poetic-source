// pages/search.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPoems } from '@/lib/poems';
import { searchPoems } from '@/lib/search';
import { Poem } from '@/lib/types';
import Layout from '@/components/Layout';
import PaginatedPoemList from '@/components/PaginatedPoemList';

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <p className="text-gray-600">
            {searchResults.length} {searchResults.length === 1 ? 'poem' : 'poems'} found
            {searchTerm && (
              <> for "<span className="font-medium">{searchTerm}</span>"</>
            )}
          </p>
        </div>

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
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const allPoems = getAllPoems();

    return {
      props: {
        poems: allPoems.map(poem => ({
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
      },
      revalidate: 3600,
    };
  }
}

export default SearchPage;