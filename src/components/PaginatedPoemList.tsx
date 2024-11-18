// components/PaginatedPoemList.tsx
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFormDisplayName, getLanguageDisplayName } from '@/lib/cache';
import Tag from '@/components/Tag';
import { Button } from '@/components/ui/button';
import { Poem } from '@/lib/types';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between mt-8">
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1 overflow-x-auto">
          {getPageNumbers().map((page, idx) => (
            <React.Fragment key={idx}>
              {page === '...' ? (
                <span className="px-2">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={cn(
                    "h-8 w-8 p-0",
                    currentPage === page && "pointer-events-none"
                  )}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalItems / pageSize)}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-sm text-gray-500 text-center md:text-left">
        Page {currentPage} of {Math.ceil(totalItems / pageSize)}
      </div>
    </nav>
  );
};

interface PaginatedPoemListProps {
  poems: Poem[];
  contextType?: 'forms' | 'languages' | 'tags' | 'search';
  contextValue?: string;
  pageSize?: number;
}

const PoemCard: React.FC<{
  poem: Poem;
  contextType?: string;
  contextValue?: string;
}> = ({ poem, contextType, contextValue }) => {
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
                {getFormDisplayName(poem.form)} in {getLanguageDisplayName(poem.language)}
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
          <span className="block text-sm text-gray-600">
            {poem.preview}
          </span>
        </Link>
      </div>
    </article>
  );
};

const PaginatedPoemList: React.FC<PaginatedPoemListProps> = ({
  poems,
  contextType,
  contextValue,
  pageSize = 10
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPoems = poems.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {currentPoems.map((poem) => (
        <PoemCard
          key={poem.id}
          poem={poem}
          contextType={contextType}
          contextValue={contextValue}
        />
      ))}

      {poems.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalItems={poems.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PaginatedPoemList;