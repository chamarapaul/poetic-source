// components/poems/shared/Tag.tsx
import React from 'react';
import Link from 'next/link';

interface TagProps {
  name: string;
  active?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Tag: React.FC<TagProps> = ({
  name,
  active = false,
  className = '',
  onClick,
}) => {
  return (
    <Link
      href={`/tags/${name}`}
      className={`
        inline-flex items-center text-xs px-2 py-1 rounded
        transition-colors duration-200
        ${
          active
            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${className}
      `}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {name}
    </Link>
  );
};

export default Tag;
