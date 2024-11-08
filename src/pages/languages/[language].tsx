// pages/languages/[language].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollText, Code, Calendar, GitBranch } from 'lucide-react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getPoemsByLanguage } from '../../lib/poems';
import { ProgrammingLanguage, languageMetadata, Poem } from '../../lib/types';

interface LanguagePageProps {
  language: ProgrammingLanguage;
  metadata: typeof languageMetadata[ProgrammingLanguage];
  poems: Poem[];
}

const LanguagePage: React.FC<LanguagePageProps> = ({ language, metadata, poems }) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Language Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {language}
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
                <Calendar className="w-5 h-5 mr-2" />
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
                <GitBranch className="w-5 h-5 mr-2" />
                Paradigms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {metadata.paradigms.map((paradigm) => (
                  <span
                    key={paradigm}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {paradigm}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Poems Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Poems in {language}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem) => (
              <Card key={poem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{poem.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center">
                      <ScrollText className="w-4 h-4 mr-1" />
                      {poem.form}
                    </span>
                    <span className="flex items-center">
                      <Code className="w-4 h-4 mr-1" />
                      {poem.language}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{poem.preview}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {poem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/poems/${poem.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read poem →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Get all language keys from the metadata
    const languages = Object.keys(languageMetadata);
    
    const paths = languages.map((language) => ({
      params: { language: language.toLowerCase() }
    }));
  
    return {
      paths,
      fallback: false
    };
  };

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
      // Find the correct casing from our defined language types
      const languageParam = params?.language as string;
      const correctLanguage = Object.keys(languageMetadata).find(
        lang => lang.toLowerCase() === languageParam.toLowerCase()
      ) as ProgrammingLanguage;
  
      if (!correctLanguage) {
        return {
          notFound: true // This will show the 404 page
        };
      }
  
      const poems = getPoemsByLanguage(correctLanguage);
      const metadata = languageMetadata[correctLanguage];
      
      return {
        props: {
          language: correctLanguage,
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
      return {
        notFound: true
      };
    }
  };

export default LanguagePage;