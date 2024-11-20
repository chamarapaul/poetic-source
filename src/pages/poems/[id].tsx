// pages/poems/[id].tsx
import { ChevronRight, Shuffle } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import PoemDisplay from '@/components/poems/PoemDisplay';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache';
import { getAllPoems, getPoemBySlug } from '@/lib/poems';
import { Poem, PoemForm, ProgrammingLanguage } from '@/lib/types';

interface PoemPageProps {
  poem: Poem;
}

export default function PoemPage({ poem }: PoemPageProps) {
  const router = useRouter();
  const { from, context } = router.query;

  const getBreadcrumbPath = () => {
    switch (from) {
      case 'forms':
        return {
          href: `/forms/${context}`,
          label: getFormDisplayName(context as PoemForm),
        };
      case 'languages':
        return {
          href: `/languages/${context}`,
          label: getLanguageDisplayName(context as ProgrammingLanguage),
        };
      case 'tags':
        return {
          href: `/tags/${context}`,
          label: `#${context}`,
        };
      case 'search':
        return {
          href: `/search?q=${context}`,
          label: `Search: "${context}"`,
        };
      default:
        return null;
    }
  };

  const breadcrumbPath = getBreadcrumbPath();

  return (
    <Layout>
      <Container className="py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:justify-between">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm text-gray-600 overflow-x-auto">
            <Link href="/poems" className="shrink-0 hover:text-gray-900">
              Browse
            </Link>

            {breadcrumbPath && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
                <Link
                  href={breadcrumbPath.href}
                  className="shrink-0 hover:text-gray-900"
                >
                  {breadcrumbPath.label}
                </Link>
              </>
            )}

            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <span className="text-gray-900 font-medium truncate">
              {poem.title}
            </span>
          </nav>

          {/* Random Poem Link */}
          <Link
            href="/poems/random"
            className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 text-sm shrink-0"
          >
            <Shuffle className="w-4 h-4" />
            Try another poem
          </Link>
        </div>

        {/* Poem Display */}
        <PoemDisplay poem={poem} />
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const poems = getAllPoems();

  return {
    paths: poems.map((poem) => ({
      params: { id: poem.id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // First get all poems to find the language
    const allPoems = getAllPoems();
    const poemInfo = allPoems.find((p) => p.id === params?.id);

    if (!poemInfo) {
      console.log(`No poem found with id: ${params?.id}`);
      return { notFound: true };
    }

    // Now we can get the full poem with its language
    const result = getPoemBySlug(params?.id as string, poemInfo.language);

    if (!result.poem) {
      return { notFound: true };
    }

    return {
      props: {
        poem: {
          ...result.poem,
          notes: {
            composition: result.poem.notes.composition || null,
            technical: result.poem.notes.technical || null,
            philosophical: result.poem.notes.philosophical || null,
          },
        },
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
};
