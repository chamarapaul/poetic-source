// components/poems/display/PoemHeader.tsx
import { Code, ScrollText, Tags } from 'lucide-react';
import Link from 'next/link';
import Tag from '@/components/poems/Tag';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache/cache';
import { Poem } from '@/lib/poems/types';

interface PoemHeaderProps {
  poem: Poem;
  variant?: 'full' | 'featured';
}

export function PoemHeader({ poem, variant = 'full' }: PoemHeaderProps) {
  const isFeatured = variant === 'featured';

  return (
    <header className="p-4 md:px-6 md:pt-6 border-b">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2 md:mb-3">
          {poem.title}
        </h2>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-4">
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
        </div>
        <div className="flex items-start md:items-center gap-2">
          <Tags className="w-4 h-4 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {poem.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
