// pages/poems/index.tsx
import React from 'react';
import Link from 'next/link';
import { getAllPoems } from '../../lib/poems';
import { Poem, getFormDisplayName, getLanguageDisplayName } from '../../lib/types';
import Layout from '../../components/Layout';

interface BrowsePageProps {
  poems: Poem[];
}

const BrowsePage = ({ poems }: BrowsePageProps) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Latest Additions</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore recently added poems.
          </p>
        </div>

        <div className="space-y-4">
          {poems.map(poem => (
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
                  {poem.tags.slice(0, 3).map(tag => (
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

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Looking for something specific?</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/forms" 
              className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              Browse by Form
            </Link>
            <Link 
              href="/languages" 
              className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              Browse by Language
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const allPoems = getAllPoems();
    // Sort by date, newest first
    const sortedPoems = allPoems.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      props: {
        poems: sortedPoems.map(poem => ({
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

export default BrowsePage;