// pages/index.tsx
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import Layout from '../components/Layout';
import PoemDisplay from '../components/PoemDisplay';
import * as poemUtils from '../lib/poems';
import { Poem } from '../lib/types';

interface HomeProps {
  initialPoem: Poem;
  totalPoems: number;
}

export default function Home({ initialPoem, totalPoems }: HomeProps) {
  const [currentPoem, setCurrentPoem] = useState<Poem>(initialPoem);

  const loadNewPoem = async () => {
    window.location.reload();
  };

  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Poetic Source
        </h1>
        <p className="text-xl text-gray-600">
          Where algorithms meet poetry, and syntax becomes art
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Exploring {totalPoems} poems across multiple languages and forms
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Featured Poem
          </h2>
          <button 
            onClick={loadNewPoem}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Discover Another
          </button>
        </div>

        <PoemDisplay poem={currentPoem} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/forms" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Browse by Form
          </h3>
          <p className="text-gray-600">
            Explore haikus, tankas, koans, and more
          </p>
        </a>
        <a href="/languages" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Browse by Language
          </h3>
          <p className="text-gray-600">
            From ALGOL-68 to Swift, find your syntax
          </p>
        </a>
        <a href="/poems" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Latest Additions
          </h3>
          <p className="text-gray-600">
            Discover newly compiled verses
          </p>
        </a>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log('Getting random poem...');
    const initialPoem = poemUtils.getRandomPoem();
    console.log('Initial poem:', JSON.stringify(initialPoem, null, 2));
    
    const allPoems = poemUtils.getAllPoems();
    console.log('Total poems found:', allPoems.length);

    // Verify all required fields are present
    if (!initialPoem.title || !initialPoem.author || !initialPoem.date) {
      throw new Error('Missing required fields in poem');
    }

    return {
      props: {
        initialPoem,
        totalPoems: allPoems.length,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // Return default props with null checks
    return {
      props: {
        initialPoem: {
          id: 'default',
          title: 'Welcome to Poetic Source',
          author: 'System',
          date: new Date().toISOString(),
          form: 'haiku',
          language: 'JavaScript',
          tags: ['welcome'],
          content: '// A default poem\n// When no poems exist yet\n// Please add some soon',
          notes: {
            composition: null,
            technical: null,
            philosophical: null,
          },
          path: '/poems/default',
          preview: 'Default poem when no others exist',
        },
        totalPoems: 0,
      },
      revalidate: 3600,
    };
  }
};