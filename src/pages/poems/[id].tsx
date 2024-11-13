// pages/poems/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import PoemDisplay from '@/components/PoemDisplay';
import { getAllPoems, getPoemBySlug } from '@/lib/poems';
import { Poem } from '@/lib/types';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache';

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
                    label: getFormDisplayName(context as any)
                };
            case 'languages':
                return {
                    href: `/languages/${context}`,
                    label: getLanguageDisplayName(context as any)
                };
            case 'tags':
                return {
                    href: `/tags/${context}`,
                    label: `#${context}`
                };
            case 'search':
                return {
                    href: `/search?q=${context}`,
                    label: `Search: "${context}"`
                };
            default:
                return null;
        }
    };

    const breadcrumbPath = getBreadcrumbPath();

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Breadcrumb Navigation */}
                <nav className="mb-6 flex items-center text-sm text-gray-600">
                    <Link
                        href="/poems"
                        className="hover:text-gray-900"
                    >
                        Browse
                    </Link>

                    {breadcrumbPath && (
                        <>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <Link
                                href={breadcrumbPath.href}
                                className="hover:text-gray-900"
                            >
                                {breadcrumbPath.label}
                            </Link>
                        </>
                    )}

                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-gray-900 font-medium">{poem.title}</span>
                </nav>

                {/* Poem Display */}
                <PoemDisplay poem={poem} />
            </div>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const poems = getAllPoems();
    
    return {
      paths: poems.map((poem) => ({
        params: { id: poem.id }
      })),
      fallback: false
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
      // First get all poems to find the language
      const allPoems = getAllPoems();
      const poemInfo = allPoems.find(p => p.id === params?.id);
    
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
              philosophical: result.poem.notes.philosophical || null
            }
          }
        },
        revalidate: 3600
      };
    } catch (error) {
      console.error('Error in getStaticProps:', error);
      return { notFound: true };
    }
  };