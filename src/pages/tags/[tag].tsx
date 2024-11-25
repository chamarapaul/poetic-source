// pages/tags/[tag].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import PaginatedPoemList from '@/components/poems/list/PaginatedPoemList';
import { getAllPoems } from '@/lib/poems/poems';
import { Poem } from '@/lib/poems/types';

interface TagPageProps {
  poems: Poem[];
  tag: string;
}

const TagPage: React.FC<TagPageProps> = ({ poems, tag }) => {
  return (
    <Layout>
      <Container className="py-8">
        <PageHeader
          title={`#${tag}`}
          description={`${poems.length} ${poems.length === 1 ? 'poem' : 'poems'} tagged with "${tag}"`}
        />

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
