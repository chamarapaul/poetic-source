// pages/tags/[tag].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import PaginatedPoemList from '@/components/poems/PaginatedPoemList';
import { TYPOGRAPHY } from '@/lib/constants';
import { getAllPoems } from '@/lib/poems';
import { Poem } from '@/lib/types';

interface TagPageProps {
  poems: Poem[];
  tag: string;
}

const TagPage: React.FC<TagPageProps> = ({ poems, tag }) => {
  return (
    <Layout>
      <Container className="py-8">
        <div className="mb-12">
          <h1 className={TYPOGRAPHY.h1}>#{tag}</h1>
          <p className="text-gray-600">
            {poems.length} {poems.length === 1 ? 'poem' : 'poems'} tagged with
            &quot;{tag}&quot;
          </p>
        </div>

        <PaginatedPoemList
          poems={poems}
          contextType="tags"
          contextValue={tag}
        />
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const poems = getAllPoems();
  const tags = new Set<string>();

  poems.forEach((poem) => {
    poem.tags.forEach((tag) => tags.add(tag));
  });

  return {
    paths: Array.from(tags).map((tag) => ({
      params: { tag },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const allPoems = getAllPoems();
  const poems = allPoems.filter((poem) => poem.tags.includes(tag));

  return {
    props: {
      poems: poems.map((poem) => ({
        ...poem,
        notes: {
          composition: poem.notes.composition || null,
          technical: poem.notes.technical || null,
          philosophical: poem.notes.philosophical || null,
        },
      })),
      tag,
    },
    revalidate: 3600,
  };
};

export default TagPage;
