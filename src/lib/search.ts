// lib/search.ts
import { Poem } from './types';

export interface SearchOptions {
  searchTerm?: string;
}

export function searchPoems(poems: Poem[], options: SearchOptions): Poem[] {
  const { searchTerm } = options;
  
  if (!searchTerm?.trim()) {
    return poems;
  }

  const searchLower = searchTerm.toLowerCase();
  
  return poems.filter(poem => {
    // Create searchable text from all relevant fields
    const searchableText = [
      poem.title,
      poem.content,
      poem.preview,
      poem.notes.technical,
      poem.notes.philosophical,
      poem.notes.composition,
      ...poem.tags,
      poem.form,
      poem.language
    ].filter(Boolean).join(' ').toLowerCase();

    return searchableText.includes(searchLower);
  });
}

// Get search result matches for highlighting
export function getSearchMatches(poem: Poem, searchTerm: string): {
  title: boolean;
  content: boolean;
  tags: boolean;
  notes: boolean;
} {
  const searchLower = searchTerm.toLowerCase();
  
  return {
    title: poem.title.toLowerCase().includes(searchLower),
    content: poem.content.toLowerCase().includes(searchLower),
    tags: poem.tags.some(tag => tag.toLowerCase().includes(searchLower)),
    notes: [
      poem.notes.technical,
      poem.notes.philosophical,
      poem.notes.composition
    ].some(note => note?.toLowerCase().includes(searchLower))
  };
}