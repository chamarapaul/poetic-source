// pages/index.tsx
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ScrollText, Code, Calendar, Tags, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import Tag from '@/components/Tag';
import { getCurrentFeaturedPoem } from '@/lib/curation';
import { getPoemBySlug, getAllPoems } from '@/lib/poems';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache';
import { Poem } from '@/lib/types';
import PoemDisplay from '@/components/PoemDisplay';

interface HomePageProps {
  featuredPoem: Poem;
  recentPoems: Poem[];
}

export default function Home({ featuredPoem, recentPoems }: HomePageProps) {
  return (
    <Layout>
      {/* Hero Section - removed extra text */}
      <section className="py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Poetic Source
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Where algorithms meet artistic expression
          </p>
          <Link 
            href="/about"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More About Code Poetry
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      <section className="pt-4 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Featured Poem
          </h2>
          <PoemDisplay poem={featuredPoem} variant="featured" />
        </div>
      </section>

      {/* Latest Additions */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Additions
              </h2>
              <p className="text-gray-600">
                Recently compiled verses in our collection
              </p>
            </div>
            <Link 
              href="/poems"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View all poems
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentPoems.map((poem) => (
              <article key={poem.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0 flex-1">
                      <Link href={`/poems/${poem.id}`} className="block no-underline">
                        <span className="block font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          {poem.title}
                        </span>
                        <span className="block text-sm text-gray-500 mt-1">
                          {getFormDisplayName(poem.form)} in {getLanguageDisplayName(poem.language)}
                        </span>
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end shrink-0">
                      {poem.tags.map((tag) => (
                        <Tag key={tag} name={tag} />
                      ))}
                    </div>
                  </div>
                  <Link href={`/poems/${poem.id}`} className="block no-underline">
                    <span className="block text-sm text-gray-600">
                      {poem.preview}
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Get featured poem
    const featuredPoemInfo = getCurrentFeaturedPoem();
    const featuredPoem = featuredPoemInfo 
      ? getPoemBySlug(featuredPoemInfo.id, featuredPoemInfo.language)
      : null;

    // Get all poems
    const allPoems = getAllPoems();
    
    // Get recent poems, excluding featured if it exists
    const recentPoems = allPoems
      .filter(poem => !featuredPoem || poem.id !== featuredPoem.id)
      .slice(0, 3);

    // Ensure all properties are serializable
    const serializedFeaturedPoem = featuredPoem ? {
      ...featuredPoem,
      notes: {
        composition: featuredPoem.notes.composition || null,
        technical: featuredPoem.notes.technical || null,
        philosophical: featuredPoem.notes.philosophical || null
      }
    } : null;

    const serializedRecentPoems = recentPoems.map(poem => ({
      ...poem,
      notes: {
        composition: poem.notes.composition || null,
        technical: poem.notes.technical || null,
        philosophical: poem.notes.philosophical || null
      }
    }));

    return {
      props: {
        featuredPoem: serializedFeaturedPoem || serializedRecentPoems[0],
        recentPoems: serializedFeaturedPoem 
          ? serializedRecentPoems 
          : serializedRecentPoems.slice(1)
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        featuredPoem: null,
        recentPoems: []
      },
      revalidate: 3600
    };
  }
};