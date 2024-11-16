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
      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-blue-600 w-24" />
            <div className="pt-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Poetic Source
              </h1>
              <p className="text-xl text-gray-600 mb-6 font-mono">
                Where algorithms meet artistic expression
              </p>
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More About Code Poetry
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
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
                Recently compiled poems
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
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
        <div className="flex justify-end">
            <Link
              href="/poems"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              <ArrowRight className="w-4 h-4 ml-1" />
              View all poems
            </Link>
          </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Get featured poem
    const featuredPoemInfo = getCurrentFeaturedPoem();
    const featuredPoemResult = featuredPoemInfo
      ? getPoemBySlug(featuredPoemInfo.id, featuredPoemInfo.language)
      : null;

    // Get all poems
    const allPoems = getAllPoems();

    // Get recent poems, excluding featured if it exists
    const recentPoems = allPoems
      .filter(poem => !featuredPoemResult?.poem || poem.id !== featuredPoemResult.poem.id)
      .slice(0, 3);

    // Ensure all properties are serializable
    const serializedFeaturedPoem = featuredPoemResult?.poem ? {
      ...featuredPoemResult.poem,
      notes: {
        composition: featuredPoemResult.poem.notes.composition || null,
        technical: featuredPoemResult.poem.notes.technical || null,
        philosophical: featuredPoemResult.poem.notes.philosophical || null
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