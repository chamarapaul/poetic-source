// components/PoemDisplay.tsx
import React from 'react';
import { ScrollText, Code, Tags, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';
import { Poem } from '@/lib/types';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache';
import CodeBlock from './CodeBlock';
import Tag from './Tag';

interface PoemDisplayProps {
  poem: Poem;
  variant?: 'full' | 'featured';  // Add variant prop to control display mode
}

export default function PoemDisplay({ poem, variant = 'full' }: PoemDisplayProps) {
  const isFeatured = variant === 'featured';

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden">
      <header className="p-6 border-b">
        {/* Title and Preview for Featured variant */}
        {isFeatured && (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {poem.title}
            </h3>
            {poem.preview && (
              <p className="text-sm text-gray-600 mb-4">{poem.preview}</p>
            )}
          </>
        )}

        {/* Title for Full variant */}
        {!isFeatured && (
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {poem.title}
          </h2>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center group">
            <ScrollText className="w-4 h-4 mr-2" />
            <Link
              href={`/forms/${poem.form}`}
              className="hover:text-blue-600 transition-colors"
            >
              {getFormDisplayName(poem.form)}
            </Link>
          </div>
          <div className="flex items-center group">
            <Code className="w-4 h-4 mr-2" />
            <Link
              href={`/languages/${poem.language}`}
              className="hover:text-blue-600 transition-colors"
            >
              {getLanguageDisplayName(poem.language)}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Tags className="w-4 h-4" />
            {poem.tags.map(tag => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </div>
      </header>

      <div className="p-6">
        <CodeBlock
          code={poem.content}
          language={poem.language}
          showLineNumbers={true}
        />
      </div>

      {!isFeatured && (
        <div className="px-6 pt-2 pb-4 flex justify-end">
          <div className="flex items-center text-sm text-gray-600">
            <Info className="w-4 h-4 mr-2" />
            <span>Created by {poem.author}</span>
          </div>
        </div>
      )}

      {/* Notes section only for full variant */}
      {!isFeatured && (poem.notes.composition || poem.notes.technical || poem.notes.philosophical) && (
        <div className="p-6 border-t bg-gray-50">
          {poem.notes.composition && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Composition Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{poem.notes.composition}</p>
            </div>
          )}
          {poem.notes.technical && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Technical Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{poem.notes.technical}</p>
            </div>
          )}
          {poem.notes.philosophical && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Philosophical Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{poem.notes.philosophical}</p>
            </div>
          )}
        </div>
      )}

      {/* View full poem link only for featured variant */}
      {isFeatured && (
        <div className="px-6 pb-6">
          <Link
            href={`/poems/${poem.id}`}
            className="text-blue-600 hover:text-blue-700 inline-flex items-center"
          >
            View full poem with notes
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </article>
  );
}