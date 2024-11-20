// lib/poems/curation/types.ts
import { ProgrammingLanguage } from '../types';

export interface CuratedPoem {
  id: string;
  language: ProgrammingLanguage;
  startDate: string;
  endDate?: string;
}

export interface ThematicCollection {
  id: string;
  title: string;
  description: string;
  poemIds: Array<{
    id: string;
    language: ProgrammingLanguage;
  }>;
  startDate: string;
  endDate?: string;
}

export interface CurationConfig {
  featuredPoems: CuratedPoem[];
  thematicCollections?: ThematicCollection[];
}
