// lib/cache/__tests__/cache.test.ts
import {
  clearMetadataCache,
  getFormDisplayName,
  getLanguageDescriptions,
  getLanguageDisplayName,
  getLanguagesByGroup,
  getLanguagesByParadigm,
  getMetadataCache,
} from '../cache';

describe('Metadata Cache', () => {
  beforeEach(() => {
    clearMetadataCache();
  });

  describe('getLanguageDisplayName', () => {
    it('returns correct display names for languages', () => {
      expect(getLanguageDisplayName('algol68')).toBe('ALGOL 68');
      expect(getLanguageDisplayName('python')).toBe('Python');
      expect(getLanguageDisplayName('cpp')).toBe('C++');
    });
  });

  describe('getFormDisplayName', () => {
    it('returns correct display names for forms', () => {
      expect(getFormDisplayName('haiku')).toBe('Haiku');
      expect(getFormDisplayName('freeverse')).toBe('Free Verse');
    });
  });

  describe('getLanguageDescriptions', () => {
    it('returns cached language descriptions', () => {
      const descriptions = getLanguageDescriptions();
      expect(descriptions.python).toBe(
        'Clear, readable syntax that flows like natural language'
      );
      expect(descriptions.kotlin).toContain('safety meets elegance');
    });

    it('returns same reference on multiple calls', () => {
      const firstCall = getLanguageDescriptions();
      const secondCall = getLanguageDescriptions();
      expect(firstCall).toBe(secondCall); // Same object reference
    });
  });

  describe('getLanguagesByParadigm', () => {
    it('groups languages by paradigm correctly', () => {
      const byParadigm = getLanguagesByParadigm();
      expect(byParadigm['functional']).toContain('lisp');
      expect(byParadigm['object-oriented']).toContain('java');
    });

    it('allows languages to appear in multiple paradigms', () => {
      const byParadigm = getLanguagesByParadigm();
      const kotlin = 'kotlin';
      expect(byParadigm['functional']).toContain(kotlin);
      expect(byParadigm['object-oriented']).toContain(kotlin);
    });
  });

  describe('getLanguagesByGroup', () => {
    it('groups languages by poetic characteristics', () => {
      const byGroup = getLanguagesByGroup();
      expect(byGroup['Natural Flow']).toContain('python');
      expect(byGroup['Modern Synthesis']).toContain('swift');
    });

    it('includes all languages exactly once', () => {
      const byGroup = getLanguagesByGroup();
      const allLanguages = Object.values(byGroup).flat();
      const uniqueLanguages = new Set(allLanguages);
      expect(allLanguages.length).toBe(uniqueLanguages.size);
    });
  });

  describe('Cache behavior', () => {
    it('maintains singleton cache instance', () => {
      const cache1 = getMetadataCache();
      const cache2 = getMetadataCache();
      expect(cache1).toBe(cache2);
    });

    it('rebuilds cache after clearing', () => {
      const cache1 = getMetadataCache();
      clearMetadataCache();
      const cache2 = getMetadataCache();
      expect(cache1).not.toBe(cache2);
      expect(cache2.languageDescriptions).toBeDefined();
    });
  });
});

// Optional: Performance tests
describe('Cache Performance', () => {
  it('improves performance for repeated calls', () => {
    clearMetadataCache();

    // First call - builds cache
    const start1 = performance.now();
    getMetadataCache();
    const time1 = performance.now() - start1;

    // Second call - uses cache
    const start2 = performance.now();
    getMetadataCache();
    const time2 = performance.now() - start2;

    expect(time2).toBeLessThan(time1);
  });
});
