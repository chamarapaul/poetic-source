// components/PoemDisplay.tsx
import React from 'react';
import { Calendar, ScrollText, Code, Tags } from 'lucide-react';
import Link from 'next/link';
import { Poem, getFormDisplayName, getLanguageDisplayName } from '../lib/types';
import CodeBlock from './CodeBlock';

interface PoemDisplayProps {
  poem: Poem;
}

export default function PoemDisplay({ poem }: PoemDisplayProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <header className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {poem.title}
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {/* <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <time>{new Date(poem.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
          </div> */}
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
          <div className="flex items-center">
            <Tags className="w-4 h-4 mr-2" />
            <span>{poem.tags.join(', ')}</span>
          </div>
        </div>
      </header>

      {/* Poem Content */}
      <div className="p-6">
        <CodeBlock 
          code={poem.content}
          language={poem.language}
          showLineNumbers={true}
        />
      </div>

      {/* Notes Sections */}
      {(poem.notes.composition || poem.notes.technical || poem.notes.philosophical) && (
        <div className="p-6 border-t bg-gray-50">
          {poem.notes.composition && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Composition Notes</h3>
              <p className="text-gray-700">{poem.notes.composition}</p>
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
              <p className="text-gray-700">{poem.notes.philosophical}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}