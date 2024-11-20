// pages/languages/[language].tsx
import { Box, FileClock } from 'lucide-react';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BulletList } from '@/components/common/BulletList';
import { DetailPage } from '@/components/common/DetailPage';
import PaginatedPoemList from '@/components/poems/PaginatedPoemList';
import { getLanguageDisplayName } from '@/lib/cache';
import { getPoemsByLanguage } from '@/lib/poems';
import { Poem, ProgrammingLanguage, languageMetadata } from '@/lib/types';

interface LanguagePageProps {
  language: ProgrammingLanguage;
  poems: Poem[];
  metadata: {
    yearCreated: number;
    paradigms: string[];
    influences: string[];
    creator: string;
    description: string;
  };
}

export default function LanguagePage({
  language,
  metadata,
  poems,
}: LanguagePageProps) {
  const displayName = getLanguageDisplayName(language);

  const cards = [
    {
      icon: FileClock,
      title: 'History',
      content: (
        <ul className="space-y-2 text-sm md:text-base">
          <li>
            <strong>Created:</strong> {metadata.yearCreated}
          </li>
          <li>
            <strong>Creator:</strong> {metadata.creator}
          </li>
          <li>
            <strong>Key Influences:</strong> {metadata.influences.join(', ')}
          </li>
        </ul>
      ),
    },
    {
      icon: Box,
      title: 'Paradigms',
      content: (
        <BulletList
          items={metadata.paradigms.map((paradigm) =>
            paradigm.split('-').join(' ')
          )}
          className="capitalize"
        />
      ),
    },
  ];

  return (
    <DetailPage
      title={displayName}
      description={metadata.description}
      cards={cards}
    >
      {/* Poems List */}
      <PaginatedPoemList
        poems={poems}
        contextType="languages"
        contextValue={language}
      />
    </DetailPage>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = Object.keys(languageMetadata) as ProgrammingLanguage[];

  const paths = languages.map((language) => ({
    params: { language },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const language = params?.language as ProgrammingLanguage;
    const poems = getPoemsByLanguage(language);
    const metadata = languageMetadata[language];

    if (!metadata) {
      return { notFound: true };
    }

    return {
      props: {
        language,
        metadata: {
          yearCreated: metadata.yearCreated,
          paradigms: metadata.paradigms,
          influences: metadata.influences,
          creator: metadata.creator,
          description: metadata.description,
        },
        poems: poems.map((poem) => ({
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
    return { notFound: true };
  }
};
