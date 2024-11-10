// pages/forms/[form].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
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
} from '../../lib/types';
import PoemList from '../../components/PoemList';

interface FormPageProps {
  poems: Poem[];
  form: PoemForm;
}

export default function FormPage({ poems, form }: FormPageProps) {
  const formInfo = formStructureInfo[form];
  const displayName = getFormDisplayName(form);
  const description = formDescriptions[form];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Form Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {displayName}
          </h1>
          {description && (
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {/* Form Structure Info */}
        {formInfo && (
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
        )}

        {/* Example if available */}
        {formInfo?.example && (
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
          
          <PoemList 
            poems={poems} 
            contextType="forms"
            contextValue={form}
          />
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
  const form = params?.form as PoemForm;
  const poems = getPoemsByForm(form);

  if (!formDescriptions[form]) {
    return { notFound: true };
  }

  return {
    props: {
      poems: poems.map(poem => ({
        ...poem,
        notes: {
          composition: poem.notes.composition || null,
          technical: poem.notes.technical || null,
          philosophical: poem.notes.philosophical || null
        }
      })),
      form
    },
    revalidate: 3600
  };
};