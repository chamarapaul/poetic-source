// pages/poems/index.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Code, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { getAllPoems } from '../../lib/poems';
import type { Poem } from '../../lib/types';
import Layout from '../../components/Layout';

interface BrowsePageProps {
  recentPoems: Poem[];
}

const BrowsePage = ({ recentPoems }: BrowsePageProps) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Latest Additions</h1>
          <p className="text-gray-600">Recently added poems</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPoems.map((poem) => (
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
    const recentPoems = allPoems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6); // Show latest 6 poems

    return {
      props: {
        recentPoems,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        recentPoems: [],
      },
      revalidate: 3600,
    };
  }
}

export default BrowsePage;