// pages/search.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import PaginatedPoemList from '@/components/poems/list/PaginatedPoemList';
import { getAllPoems } from '@/lib/poems/poems';
import { searchPoems } from '@/lib/poems/search';
import { Poem } from '@/lib/poems/types';
import { ActionButton } from '@/components/shared/buttons/action-buttons';

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
          description={`${searchResults.length} ${searchResults.length === 1 ? 'poem' : 'poems'
            } found${searchTerm ? ` for "${searchTerm}"` : ''}`}
        />

        {searchResults.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600 mb-6">
              No poems found matching your search
            </p>
            <ActionButton href="/poems">
              Browse All Poems
            </ActionButton>
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
