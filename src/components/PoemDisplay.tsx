// components/PoemDisplay.tsx
import React, { useState } from 'react';
import { ScrollText, Code, Tags, ArrowRight, Info, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Poem } from '@/lib/types';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache';
import CodeBlock from './CodeBlock';
import Tag from './Tag';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface PoemDisplayProps {
  poem: Poem;
  variant?: 'full' | 'featured';  // Add variant prop to control display mode
}

export default function PoemDisplay({ poem, variant = 'full' }: PoemDisplayProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isFeatured = variant === 'featured';

  // State for collapsible sections (mobile only)
  const [openSection, setOpenSection] = useState<string | null>('composition');

  const toggleSection = (section: string) => {
    if (!isDesktop) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  const NotesSection = ({ type, content }: { type: string; content: string | null | undefined }) => {
    if (!content) return null;
    const isOpen = isDesktop || openSection === type;

    return (
      <div>
        {!isDesktop ? (
          // Mobile: Collapsible version
          <>
            <button
              onClick={() => toggleSection(type)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <h3 className="text-lg font-semibold">
                {type.charAt(0).toUpperCase() + type.slice(1)} Notes
              </h3>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            <div
              className={cn(
                "overflow-hidden transition-[max-height] duration-300 ease-in-out",
                isOpen ? "max-h-[1000px]" : "max-h-0"
              )}
            >
              <div className="p-4 pt-0">
                <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
              </div>
            </div>
          </>
        ) : (
          // Desktop: Regular version
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              {type.charAt(0).toUpperCase() + type.slice(1)} Notes
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden">
      <header className="p-4 md:p-6 border-b">
        {/* Title and Preview for Featured variant */}
        {isFeatured && (
          <>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
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

        <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center group">
              <ScrollText className="w-4 h-4 mr-2" />
              <Link href={`/forms/${poem.form}`} className="hover:text-blue-600 transition-colors">
                {getFormDisplayName(poem.form)}
              </Link>
            </div>
            <div className="flex items-center group">
              <Code className="w-4 h-4 mr-2" />
              <Link href={`/languages/${poem.language}`} className="hover:text-blue-600 transition-colors">
                {getLanguageDisplayName(poem.language)}
              </Link>
            </div>
          </div>
          <div className="flex items-start md:items-center gap-2">
            <Tags className="w-4 h-4 shrink-0" />
            <div className="flex flex-wrap gap-2">
              {poem.tags.map(tag => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <CodeBlock
          code={poem.content}
          language={poem.language}
          showLineNumbers={isDesktop}
        />
      </div>

      {!isFeatured && (
        <div className="px-6 pb-6">
          <div className="flex items-center text-sm text-gray-600 justify-end">
            <Info className="w-4 h-4 mr-2" />
            <span>Created by {poem.author}</span>
          </div>
        </div>
      )}

      {/* Notes section only for full variant */}
      {!isFeatured && (poem.notes.composition || poem.notes.technical || poem.notes.philosophical) && (
        <div className="border-t bg-gray-50">
          {(['composition', 'technical', 'philosophical'] as const).map((type) => (
            <NotesSection
              key={type}
              type={type}
              content={poem.notes[type]}
            />
          ))}
        </div>
      )}

      {/* View full poem link only for featured variant */}
      {isFeatured && (
        <div className="px-6 pb-6">
          <div className="flex justify-end">
            <Link
              href={`/poems/${poem.id}`}
              className="text-blue-600 hover:text-blue-700 inline-flex items-center text-sm"
            >
              <ArrowRight className="w-4 h-4 ml-1" />
              View full poem with notes

            </Link>
          </div>
        </div>
      )}
    </article>
  );
}