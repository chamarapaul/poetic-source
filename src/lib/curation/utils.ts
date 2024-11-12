// lib/curation/utils.ts
import { CuratedPoem, ThematicCollection } from './types';
import { curationConfig } from './config';

export function getCurrentFeaturedPoem(): CuratedPoem | null {
  const now = new Date();
  
  return curationConfig.featuredPoems.find(entry => {
    const start = new Date(entry.startDate);
    const end = entry.endDate ? new Date(entry.endDate) : new Date("9999-12-31");
    return now >= start && now <= end;
  }) || curationConfig.featuredPoems[0]; // fallback to first entry
}

export function getFeaturedPoemHistory(): CuratedPoem[] {
  return curationConfig.featuredPoems
    .filter(poem => poem.endDate) // Only get poems with end dates
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getCurrentThematicCollection(): ThematicCollection | null {
  const now = new Date();
  
  return curationConfig.thematicCollections?.find(collection => {
    const start = new Date(collection.startDate);
    const end = collection.endDate ? new Date(collection.endDate) : new Date("9999-12-31");
    return now >= start && now <= end;
  }) || null;
}