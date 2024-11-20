// components/poems/NotesSection.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotesSectionProps {
  type: 'composition' | 'technical' | 'philosophical';
  content: string | undefined;
  isOpen: boolean;
  onToggle: () => void;
  isDesktop: boolean;
}

export const NotesSection = ({
  type,
  content,
  isOpen,
  onToggle,
  isDesktop,
}: NotesSectionProps) => {
  if (!content) return null;

  return (
    <div className="border-t first:border-t-0">
      {!isDesktop ? (
        // Mobile collapsible version
        <>
          <button
            onClick={onToggle}
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
              'overflow-hidden transition-[max-height] duration-300 ease-in-out',
              isOpen ? 'max-h-[1000px]' : 'max-h-0'
            )}
          >
            <div className="p-4 pt-0">
              <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        </>
      ) : (
        // Desktop version
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            {type.charAt(0).toUpperCase() + type.slice(1)} Notes
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        </div>
      )}
    </div>
  );
};
