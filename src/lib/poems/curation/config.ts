// lib/poems/curation/config.ts
import { CurationConfig } from './types';

export const curationConfig: CurationConfig = {
  featuredPoems: [
    {
      id: 'loves-reference-count',
      language: 'cpp',
      startDate: '2024-12-24',
      // Current feature - no endDate
    },
    {
      id: 'quantum-tanka',
      language: 'python',
      startDate: '2024-11-14',
      endDate: '2024-12-24',
    },
  ],
  thematicCollections: [
    {
      id: 'debugging-wisdom',
      title: 'The Art of Debugging',
      description: 'Poems that explore debugging as a journey of understanding',
      poemIds: [
        { id: 'zen-master-debugging', language: 'algol68' },
        // Add more related poems here
      ],
      startDate: '2024-11-01',
    },
  ],
};
