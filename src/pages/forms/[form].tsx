// pages/forms/[form].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollText, Code } from 'lucide-react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getPoemsByForm } from '../../lib/poems';
import { 
  formDescriptions, 
  formStructureInfo, 
  Poem, 
  PoemForm,
  getFormDisplayName,
  getLanguageDisplayName,
  ProgrammingLanguage 
} from '../../lib/types';

interface FormPageProps {
  form: PoemForm;
  description: string;
  poems: Poem[];
}

const FormPage: React.FC<FormPageProps> = ({ form, description, poems }) => {
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

        {/* Poems Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {displayName} Poems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem) => (
              <Card key={poem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{poem.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center">
                      <ScrollText className="w-4 h-4 mr-1" />
                      {getFormDisplayName(poem.form)}
                    </span>
                    <span className="flex items-center">
                      <Code className="w-4 h-4 mr-1" />
                      {getLanguageDisplayName(poem.language)}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{poem.preview}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {poem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/poems/${poem.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read poem →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const forms: PoemForm[] = ['haiku', 'tanka', 'renga', 'koan', 'ghazal', 'freeverse'];
  
  const paths = forms.map((form) => ({
    params: { form }  // No need to toLowerCase() since they're already lowercase
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

export default FormPage;