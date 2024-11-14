// lib/poems.ts
import {
    PoemForm,
    ProgrammingLanguage,
    PoeticGroup,
    formDescriptions,
    formStructureInfo,
    languageMetadata,
    poeticCharacteristics,
    poeticGroupMetadata,
} from './types';

export interface CachedMetadata {
    languageDescriptions: Record<ProgrammingLanguage, string>;
    formDisplayNames: Record<PoemForm, string>;
    
    // Form-related
    formDescriptions: Record<PoemForm, string>;
    formStructureInfo: Record<PoemForm, {
        rules: string[];
        codeConsiderations: string[];
        example?: string;
    }>;

    // Language-related
    languageMetadata: Record<ProgrammingLanguage, {
        yearCreated: number;
        paradigms: string[];
        influences: string[];
        creator: string;
        description: string;
    }>;

    // Poetic characteristics
    poeticCharacteristics: Record<ProgrammingLanguage, {
        group: PoeticGroup;
        color: string;
    }>;

    // Poetic group metadata
    poeticGroupMetadata: Record<PoeticGroup, {
        description: string;
        features: string[];
    }>;

    // Derived groupings
    languagesByGroup: Record<PoeticGroup, ProgrammingLanguage[]>;
    languagesByParadigm: Record<string, ProgrammingLanguage[]>;
}

let metadataCache: CachedMetadata | null = null;

export function getMetadataCache(): CachedMetadata {
    if (metadataCache) {
        return metadataCache;
    }

    // Initialize paradigms map
    const languagesByParadigm: Record<string, ProgrammingLanguage[]> = {};
    Object.entries(languageMetadata).forEach(([lang, meta]) => {
        meta.paradigms.forEach(paradigm => {
            if (!languagesByParadigm[paradigm]) {
                languagesByParadigm[paradigm] = [];
            }
            languagesByParadigm[paradigm].push(lang as ProgrammingLanguage);
        });
    });

    // Initialize languages by group
    const languagesByGroup: Record<PoeticGroup, ProgrammingLanguage[]> = {} as Record<PoeticGroup, ProgrammingLanguage[]>;
    Object.entries(poeticCharacteristics).forEach(([lang, meta]) => {
        if (!languagesByGroup[meta.group]) {
            languagesByGroup[meta.group] = [];
        }
        languagesByGroup[meta.group].push(lang as ProgrammingLanguage);
    });

    // Initialize cache
    metadataCache = {
        // Basic metadata
        languageDescriptions: Object.fromEntries(
            Object.entries(languageMetadata).map(([lang, meta]) => 
                [lang, meta.description]
            )
        ) as Record<ProgrammingLanguage, string>,

        formDisplayNames: Object.fromEntries(
            Object.keys(formDescriptions).map(form => [
                form,
                form === 'rubai' ? 'Rubaʿi' :
                form === 'freeverse' ? 'Free Verse' : 
                form.charAt(0).toUpperCase() + form.slice(1)
            ])
        ) as Record<PoemForm, string>,

        // Form-related
        formDescriptions,
        formStructureInfo,

        // Language-related
        languageMetadata,

        // Poetic characteristics
        poeticCharacteristics,

        // Poetic group metadata
        poeticGroupMetadata,

        // Derived groupings
        languagesByGroup,
        languagesByParadigm
    };

    return metadataCache;
}

// Export the original function directly - no need to cache simple lookups
export { getLanguageDisplayName } from './types';

// Helper functions for cached data
export function getLanguageDescriptions(): Record<ProgrammingLanguage, string> {
    return getMetadataCache().languageDescriptions;
}

export function getFormDisplayName(form: PoemForm): string {
    return getMetadataCache().formDisplayNames[form];
}

export function getLanguagesByParadigm(): Record<string, ProgrammingLanguage[]> {
    return getMetadataCache().languagesByParadigm;
}

export function getLanguagesByGroup(): Record<PoeticGroup, ProgrammingLanguage[]> {
    return getMetadataCache().languagesByGroup;
}

// Function to clear cache if needed (useful for testing)
export function clearMetadataCache(): void {
    metadataCache = null;
}