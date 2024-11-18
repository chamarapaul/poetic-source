// pages/tags/[tag].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPoems } from '@/lib/poems';
import { Poem } from '@/lib/types';
import Layout from '@/components/Layout';
import PaginatedPoemList from '@/components/PaginatedPoemList';

interface TagPageProps {
  poems: Poem[];
  tag: string;
}

const TagPage: React.FC<TagPageProps> = ({ poems, tag }) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">#{tag}</h1>
          <p className="text-gray-600">
          {poems.length} {poems.length === 1 ? 'poem' : 'poems'} tagged with "{tag}"
        </p>
        </div>

        <PaginatedPoemList
          poems={poems}
          contextType="tags"
          contextValue={tag}
        />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const poems = getAllPoems();
  const tags = new Set<string>();

  poems.forEach(poem => {
    poem.tags.forEach(tag => tags.add(tag));
  });

  return {
    paths: Array.from(tags).map(tag => ({
      params: { tag }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const allPoems = getAllPoems();
  const poems = allPoems.filter(poem => poem.tags.includes(tag));

  return {
    props: {
      poems: poems.map(poem => ({
        ...poem,
        notes: {
          composition: poem.notes.composition || null,
          technical: poem.notes.technical || null,
          philosophical: poem.notes.philosophical || null
        }
      })),
      tag
    },
    revalidate: 3600
  };
};

export default TagPage;