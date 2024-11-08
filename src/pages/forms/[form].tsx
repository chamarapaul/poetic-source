// pages/forms/[form].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ScrollText } from 'lucide-react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getPoemsByForm } from '../../lib/poems';
import { 
  PoemForm, 
  formDescriptions, 
  formStructureInfo,
  Poem, 
  getFormDisplayName,
  getLanguageDisplayName
} from '../../lib/types';

interface FormPageProps {
  form: PoemForm;
  description: string;
  poems: Poem[];
}

export default function FormPage({ form, description, poems }: FormPageProps) {
  const formInfo = formStructureInfo[form];
  const displayName = getFormDisplayName(form);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Form Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {displayName}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            {description}
          </p>
        </div>

        {/* Form Structure Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {formInfo.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {formInfo.codeConsiderations.map((consideration, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    {consideration}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Example if available */}
        {formInfo.example && (
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Example Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {formInfo.example}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Poems List */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            {displayName} Poems
          </h2>
          
          <div className="space-y-4">
            {poems.map(poem => (
              <Link
                key={poem.id}
                href={`/poems/${poem.id}?from=forms&context=${form}`}
                className="block bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {poem.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Written in {getLanguageDisplayName(poem.language)}
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
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const forms: PoemForm[] = ['haiku', 'tanka', 'renga', 'koan', 'ghazal', 'freeverse'];
  
  const paths = forms.map((form) => ({
    params: { form }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const form = params?.form as PoemForm;
    const poems = getPoemsByForm(form);
    
    if (!formDescriptions[form]) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        form,
        description: formDescriptions[form],
        poems: poems.map(poem => ({
          ...poem,
          notes: {
            composition: poem.notes.composition || null,
            technical: poem.notes.technical || null,
            philosophical: poem.notes.philosophical || null
          }
        })),
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