// __tests__/lib/poems/search.test.ts
import { getSearchMatches, searchPoems } from '@/lib/poems/search';
import { Poem } from '@/lib/poems/types';

const mockPoems: Poem[] = [
  {
    id: 'test-1',
    title: 'Morning Algorithm',
    author: 'Test Author',
    date: '2024-01-01T00:00:00Z',
    form: 'haiku',
    language: 'python',
    tags: ['nature', 'algorithms'],
    content: 'def morning_light():\n    dawn.break()\n    return peace',
    preview: 'A morning algorithm',
    notes: {
      technical: 'Uses morning metaphors',
      philosophical: 'Explores dawn patterns',
      composition: 'Morning-themed code',
    },
  },
  {
    id: 'test-2',
    title: 'Evening Function',
    author: 'Test Author',
    date: '2024-01-02T00:00:00Z',
    form: 'tanka',
    language: 'ruby',
    tags: ['evening', 'functions'],
    content: 'def evening_peace\n  stars.shine\nend',
    preview: 'An evening function',
    notes: {
      technical: 'Evening calculations',
      philosophical: 'Night patterns',
    },
  },
];

describe('Search Functionality', () => {
  describe('searchPoems', () => {
    it('returns all poems when no search term provided', () => {
      const results = searchPoems(mockPoems, {});
      expect(results).toHaveLength(mockPoems.length);
    });

    it('performs case-insensitive search', () => {
      const results = searchPoems(mockPoems, { searchTerm: 'MORNING' });
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('test-1');
    });

    it('searches across all relevant fields', () => {
      // Search in title
      expect(searchPoems(mockPoems, { searchTerm: 'algorithm' })).toHaveLength(
        1
      );

      // Search in content
      expect(searchPoems(mockPoems, { searchTerm: 'stars' })).toHaveLength(1);

      // Search in tags
      expect(searchPoems(mockPoems, { searchTerm: 'nature' })).toHaveLength(1);

      // Search in notes
      expect(searchPoems(mockPoems, { searchTerm: 'patterns' })).toHaveLength(
        2
      );
    });

    it('handles empty search terms', () => {
      const results = searchPoems(mockPoems, { searchTerm: '' });
      expect(results).toHaveLength(mockPoems.length);
    });

    it('handles special characters in search', () => {
      const results = searchPoems(mockPoems, { searchTerm: 'def' });
      expect(results).toHaveLength(2);
    });
  });

  describe('getSearchMatches', () => {
    it('identifies matches in different fields', () => {
      const matches = getSearchMatches(mockPoems[0], 'morning');

      expect(matches).toEqual({
        title: true,
        content: true,
        tags: false,
        notes: true,
      });
    });

    it('handles case-insensitive matching', () => {
      const matches = getSearchMatches(mockPoems[0], 'ALGORITHM');

      expect(matches.title).toBe(true);
    });

    it('returns false for non-matches', () => {
      const matches = getSearchMatches(mockPoems[0], 'evening');

      expect(matches).toEqual({
        title: false,
        content: false,
        tags: false,
        notes: false,
      });
    });
  });
});
