// components/PoemList.tsx
import React from 'react';
import Link from 'next/link';
import { Poem } from '../lib/types';
import { getFormDisplayName, getLanguageDisplayName } from '../lib/cache';
import Tag from './Tag';

interface PoemListProps {
    poems: Poem[];
    contextType?: 'forms' | 'languages' | 'tags' | 'search';
    contextValue?: string;
}

const PoemList: React.FC<PoemListProps> = ({
    poems,
    contextType,
    contextValue
}) => {
    return (
        <div className="space-y-4">
            {poems.map(poem => (
                <Link
                    key={poem.id}
                    href={`/poems/${poem.id}${contextType ? `?from=${contextType}&context=${contextValue}` : ''}`}
                    className="block bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                {poem.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                                {getFormDisplayName(poem.form)} in {getLanguageDisplayName(poem.language)}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {poem.tags.map(tag => (
                                <Tag
                                    key={tag}
                                    name={tag}
                                    active={contextType === 'tags' && contextValue === tag}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        {poem.preview}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default PoemList;