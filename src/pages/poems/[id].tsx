// pages/poems/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import PoemDisplay from '@/components/PoemDisplay';
import { getAllPoems, getPoemBySlug } from '@/lib/poems';
import { Poem, getFormDisplayName, getLanguageDisplayName } from '@/lib/types';

interface PoemPageProps {
  poem: Poem;
}

export default function PoemPage({ poem }: PoemPageProps) {
    const router = useRouter();
    const { from, context } = router.query;
  
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
            <ChevronRight className="w-4 h-4 mx-2" />
            {from && context && (
              <>
                <Link 
                  href={`/${from}/${context}`}
                  className="hover:text-gray-900"
                >
                  {from === 'forms' 
                    ? getFormDisplayName(context as any)
                    : getLanguageDisplayName(context as any)
                  }
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
              </>
            )}
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
  
  const paths = poems.map((poem) => ({
    params: { id: poem.id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const poem = getPoemBySlug(id);
    
    if (!poem) {
      return { notFound: true };
    }

    return {
      props: {
        poem: {
          ...poem,
          notes: {
            composition: poem.notes.composition || null,
            technical: poem.notes.technical || null,
            philosophical: poem.notes.philosophical || null
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