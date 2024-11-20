// pages/forms/[form].tsx
import { Code, ListTree } from 'lucide-react';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BulletList } from '@/components/common/BulletList';
import { DetailPage } from '@/components/common/DetailPage';
import PaginatedPoemList from '@/components/poems/PaginatedPoemList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFormDisplayName } from '@/lib/cache';
import { SPACING } from '@/lib/constants';
import { getPoemsByForm } from '@/lib/poems';
import {
  Poem,
  PoemForm,
  formDescriptions,
  formStructureInfo,
} from '@/lib/types';

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
      content: <BulletList items={formInfo.rules} />,
    },
    {
      icon: Code,
      title: 'Code Considerations',
      content: <BulletList items={formInfo.codeConsiderations} />,
    },
  ];

  return (
    <DetailPage
      title={displayName}
      description={description || ''}
      cards={cards}
    >
      {/* Example if available */}
      {formInfo?.example && (
        <div className={SPACING.section}>
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
  const forms: PoemForm[] = [
    'ghazal',
    'haiku',
    'rubai',
    'tanka',
    'koan',
    'freeverse',
  ];

  const paths = forms.map((form) => ({
    params: { form },
  }));

  return {
    paths,
    fallback: false,
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
      poems: poems.map((poem) => ({
        ...poem,
        notes: {
          composition: poem.notes.composition || null,
          technical: poem.notes.technical || null,
          philosophical: poem.notes.philosophical || null,
        },
      })),
      form,
    },
    revalidate: 3600,
  };
};
