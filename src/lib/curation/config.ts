// lib/curation/config.ts
import { CurationConfig } from './types';

export const curationConfig: CurationConfig = {
  featuredPoems: [
    {
      id: "quantum-tanka",
      language: "python",
      startDate: "2024-11-14",
      // Current feature - no endDate
    },
    {
      id: "binary-search-meditation",
      language: "ruby",
      startDate: "2024-10-15",
      endDate: "2024-11-11"
    }
  ],
  thematicCollections: [
    {
      id: "debugging-wisdom",
      title: "The Art of Debugging",
      description: "Poems that explore debugging as a journey of understanding",
      poemIds: [
        { id: "zen-master-debugging", language: "algol68" },
        // Add more related poems here
      ],
      startDate: "2024-11-01"
    }
  ]
};
