// pages/tags/[tag].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Hash } from 'lucide-react';
import Link from 'next/link';
import { getAllPoems } from '../../lib/poems';
import { Poem } from '../../lib/types';
import Layout from '../../components/Layout';
import PoemList from '../../components/PoemList';
import Tag from '../../components/Tag';

interface TagPageProps {
  poems: Poem[];
  tag: string;
  relatedTags: Array<{
    name: string;
    count: number;
    weight: number;
  }>;
}

const TagPage: React.FC<TagPageProps> = ({ poems, tag, relatedTags }) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-6 w-6 text-blue-500" />
            <h1 className="text-3xl font-bold">#{tag}</h1>
          </div>
          <p className="text-gray-600 mb-6">
            {poems.length} {poems.length === 1 ? 'poem' : 'poems'} tagged with "{tag}"
          </p>
        </div>

        {poems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No poems found with this tag</p>
            <Link
              href="/poems"
              className="text-blue-600 hover:text-blue-700"
            >
              Browse all poems
            </Link>
          </div>
        ) : (
          <PoemList 
            poems={poems} 
            contextType="tags" 
            contextValue={tag} 
          />
        )}
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