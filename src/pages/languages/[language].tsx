// pages/languages/[language].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FileClock, Box } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
  
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Language Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {displayName}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              {metadata.description}
            </p>
          </div>
  
          {/* Language Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileClock className="w-5 h-5 mr-2" />
                  History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><strong>Created:</strong> {metadata.yearCreated}</li>
                  <li><strong>Creator:</strong> {metadata.creator}</li>
                  <li><strong>Key Influences:</strong> {metadata.influences.join(', ')}</li>
                </ul>
              </CardContent>
            </Card>
  
            <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Box className="w-5 h-5 mr-2" />
                Paradigms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {metadata.paradigms.map((paradigm, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                  >
                    <span className="font-medium mr-2">•</span>
                    <span className="capitalize">
                      {paradigm.split('-').join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          </div>
  
          {/* Poems List */}
          <PaginatedPoemList 
            poems={poems}
            contextType="languages"
            contextValue={language}
          />
        </div>
      </Layout>
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