// pages/search.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAllPoems } from '../lib/poems';
import { searchPoems } from '../lib/search';
import { Poem, getFormDisplayName, getLanguageDisplayName } from '../lib/types';
import Layout from '../components/Layout';

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
      <div className="container mx-auto px-4 py-8">
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
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No poems found matching your search</p>
            <Link
              href="/poems"
              className="text-blue-600 hover:text-blue-700"
            >
              Browse all poems
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {searchResults.map(poem => (
              <Link
                key={poem.id}
                href={`/poems/${poem.id}`}
                className="block bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {poem.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {getFormDisplayName(poem.form)} in {getLanguageDisplayName(poem.language)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {poem.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {poem.preview}
                </p>
              </Link>
            ))}
          </div>
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