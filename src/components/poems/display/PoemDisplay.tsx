// components/poems/display/PoemDisplay.tsx
import { Info } from 'lucide-react';
import React, { useState } from 'react';
import CodeBlock from '@/components/poems/display/CodeBlock';
import { NotesSection } from '@/components/poems/display/NotesSection';
import { PoemHeader } from '@/components/poems/display/PoemHeader';
import { NavButton } from '@/components/shared/buttons/action-buttons';
import { Poem } from '@/lib/poems/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface PoemDisplayProps {
  poem: Poem;
  variant?: 'full' | 'featured'; // Add variant prop to control display mode
}

export default function PoemDisplay({
  poem,
  variant = 'full',
}: PoemDisplayProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isFeatured = variant === 'featured';

  // State for collapsible sections (mobile only)
  const [openSection, setOpenSection] = useState<string | null>('composition');
  const toggleSection = (section: string) => {
    if (!isDesktop) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden">
      <PoemHeader poem={poem} variant={variant} />

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
      {!isFeatured &&
        (poem.notes.composition ||
          poem.notes.technical ||
          poem.notes.philosophical) && (
          <div className="border-t bg-gray-50 md:pt-2">
            {(['composition', 'technical', 'philosophical'] as const).map(
              (type) => (
                <NotesSection
                  key={type}
                  type={type}
                  content={poem.notes[type]}
                  isOpen={openSection === type}
                  onToggle={() => toggleSection(type)}
                  isDesktop={isDesktop}
                />
              )
            )}
          </div>
        )}

      {/* View full poem link only for featured variant */}
      {isFeatured && (
        <div className="px-6 pb-6">
          <div className="flex justify-end">
            <NavButton
              href={`/poems/${poem.id}`}
              className="gap-0"
              iconPosition="left"
            >
              View full poem with notes
            </NavButton>
          </div>
        </div>
      )}
    </article>
  );
}
