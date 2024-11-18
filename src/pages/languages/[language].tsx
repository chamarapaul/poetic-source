// pages/languages/[language].tsx
import React from 'react';
import { DetailPage } from '@/components/DetailPage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FileClock, Box } from 'lucide-react';
import { getPoemsByLanguage } from '@/lib/poems';
import { ProgrammingLanguage, languageMetadata, Poem } from '@/lib/types';
import { getLanguageDisplayName } from '@/lib/cache';
import PaginatedPoemList from '@/components/PaginatedPoemList';

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

export default function LanguagePage({ language, metadata, poems }: LanguagePageProps) {
  const displayName = getLanguageDisplayName(language);

  const cards = [
    {
      icon: FileClock,
      title: 'History',
      content: (
        <ul className="space-y-2 text-sm md:text-base">
          <li><strong>Created:</strong> {metadata.yearCreated}</li>
          <li><strong>Creator:</strong> {metadata.creator}</li>
          <li><strong>Key Influences:</strong> {metadata.influences.join(', ')}</li>
        </ul>
      )
    },
    {
      icon: Box,
      title: 'Paradigms',
      content: (
        <ul className="space-y-2">
          {metadata.paradigms.map((paradigm, index) => (
            <li key={index} className="flex items-start">
              <span className="font-medium mr-2">•</span>
              <span className="capitalize text-sm md:text-base">
                {paradigm.split('-').join(' ')}
              </span>
            </li>
          ))}
        </ul>
      )
    }
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
    params: { language }
  }));

  return {
    paths,
    fallback: false
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
          description: metadata.description
        },
        poems: poems.map(poem => ({
          ...poem,
          notes: {
            composition: poem.notes.composition || null,
            technical: poem.notes.technical || null,
            philosophical: poem.notes.philosophical || null
          }
        }))
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
};