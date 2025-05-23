// components/poems/list/PoemCard.tsx
import Link from 'next/link';
import Tag from '@/components/poems/shared/Tag';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache/cache';
import { Poem } from '@/lib/poems/types';

interface PoemCardProps {
  poem: Poem;
  contextType?: string;
  contextValue?: string;
}

export const PoemCard = ({
  poem,
  contextType,
  contextValue,
}: PoemCardProps) => {
  const href = `/poems/${poem.id}${contextType ? `?from=${contextType}&context=${contextValue}` : ''}`;

  return (
    <article className="bg-white rounded-lg border hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 mb-2">
          <div className="min-w-0 flex-1">
            <Link href={href} className="block no-underline">
              <span className="block font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {poem.title}
              </span>
              <span className="block text-sm text-gray-500 mt-1">
                {getFormDisplayName(poem.form)} in{' '}
                {getLanguageDisplayName(poem.language)}
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-auto">
            {poem.tags.map((tag) => (
              <Tag
                key={tag}
                name={tag}
                active={contextType === 'tags' && contextValue === tag}
              />
            ))}
          </div>
        </div>
        <Link href={href} className="block no-underline">
          <span className="block text-sm text-gray-600">{poem.preview}</span>
        </Link>
      </div>
    </article>
  );
};
