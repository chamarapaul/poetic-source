// pages/index.tsx
import { ArrowRight } from 'lucide-react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import PoemDisplay from '@/components/poems/display/PoemDisplay';
import PaginatedPoemList from '@/components/poems/list/PaginatedPoemList';
import { TYPOGRAPHY } from '@/lib/constants';
import { getCurrentFeaturedPoem } from '@/lib/poems/curation';
import { getAllPoems, getPoemBySlug } from '@/lib/poems/poems';
import { Poem } from '@/lib/poems/types';

interface HomePageProps {
  featuredPoem: Poem;
  recentPoems: Poem[];
}

export default function Home({ featuredPoem, recentPoems }: HomePageProps) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-6 md:pt-8 pb-12 md:pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-blue-600 w-24" />
            <div className="pt-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Poetic Source
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 font-mono">
                Where algorithms meet artistic expression
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More About Code Poetry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="pt-4 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
            Featured Poem
          </h2>
          <PoemDisplay poem={featuredPoem} variant="featured" />
        </div>
      </section>

      {/* Latest Additions */}
      <section className="py-6 md:py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Latest Additions
            </h2>
            <p className={TYPOGRAPHY.body}>Recently compiled poems</p>
          </div>

          <PaginatedPoemList poems={recentPoems} />
        </div>
        <div className="flex justify-end mt-4 md:mt-6 px-4">
          <Link
            href="/poems"
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm md:text-base"
          >
            View all poems
            <ArrowRight className="w-4 h-4 ml-1" />
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
      .filter(
        (poem) =>
          !featuredPoemResult?.poem || poem.id !== featuredPoemResult.poem.id
      )
      .slice(0, 3);

    // Ensure all properties are serializable
    const serializedFeaturedPoem = featuredPoemResult?.poem
      ? {
          ...featuredPoemResult.poem,
          notes: {
            composition: featuredPoemResult.poem.notes.composition || null,
            technical: featuredPoemResult.poem.notes.technical || null,
            philosophical: featuredPoemResult.poem.notes.philosophical || null,
          },
        }
      : null;

    const serializedRecentPoems = recentPoems.map((poem) => ({
      ...poem,
      notes: {
        composition: poem.notes.composition || null,
        technical: poem.notes.technical || null,
        philosophical: poem.notes.philosophical || null,
      },
    }));

    return {
      props: {
        featuredPoem: serializedFeaturedPoem || serializedRecentPoems[0],
        recentPoems: serializedFeaturedPoem
          ? serializedRecentPoems
          : serializedRecentPoems.slice(1),
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        featuredPoem: null,
        recentPoems: [],
      },
      revalidate: 3600,
    };
  }
};
