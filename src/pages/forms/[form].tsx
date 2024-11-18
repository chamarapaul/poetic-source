// pages/forms/[form].tsx
import React from 'react';
import { DetailPage } from '@/components/DetailPage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ListTree, Code } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getPoemsByForm } from '@/lib/poems';
import {
  PoemForm,
  formDescriptions,
  formStructureInfo,
  Poem
} from '@/lib/types';
import { getFormDisplayName } from '@/lib/cache';
import PaginatedPoemList from '@/components/PaginatedPoemList';

interface FormPageProps {
  poems: Poem[];
  form: PoemForm;
}

export default function FormPage({ poems, form }: FormPageProps) {
  const formInfo = formStructureInfo[form];
  const displayName = getFormDisplayName(form);
  const description = formDescriptions[form];

  const cards = [
    {
      icon: ListTree,
      title: 'Structure',
      content: (
        <ul className="space-y-2">
          {formInfo?.rules.map((rule, index) => (
            <li key={index} className="flex items-start">
              <span className="font-medium mr-2">•</span>
              <span className="text-sm md:text-base">{rule}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      icon: Code,
      title: 'Code Considerations',
      content: (
        <ul className="space-y-2">
          {formInfo?.codeConsiderations.map((consideration, index) => (
            <li key={index} className="flex items-start">
              <span className="font-medium mr-2">•</span>
              <span className="text-sm md:text-base">{consideration}</span>
            </li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <DetailPage
      title={displayName}
      description={description || ''}
      cards={cards}
    >
      {/* Example if available */}
      {formInfo?.example && (
        <div className="mb-8 md:mb-12">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle>Example Structure</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:space-y-2 pt-0">
              <pre className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm md:text-base overflow-x-auto">
                {formInfo.example}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Poems List */}
      <PaginatedPoemList
        poems={poems}
        contextType="forms"
        contextValue={form}
      />
    </DetailPage>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const forms: PoemForm[] = ['ghazal', 'haiku', 'rubai', 'tanka', 'koan', 'freeverse'];

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