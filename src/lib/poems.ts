// lib/poems.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  PoemForm,
  formDescriptions,
  Poem,
  ProgrammingLanguage,
  languageMetadata,
  CategorySummary
} from './types';
import { getLanguageDescriptions } from './cache';
import { validatePoemStructure, ValidationResult } from './validation/poem';

const POEMS_DIR = path.join(process.cwd(), 'poems');

// Interface for poem loading results
interface PoemLoadResult {
  poem: Poem | null;
  validation: ValidationResult;
}

/**
 * Get all poem files from a language directory
 */
function getPoemFilesFromLanguage(language: string): string[] {
  const languageDir = path.join(POEMS_DIR, language);

  try {
    if (!fs.existsSync(languageDir)) {
      return [];
    }
    return fs.readdirSync(languageDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.basename(file, '.md')); // Just return the filename without extension
  } catch (error) {
    console.error(`Error reading poems from ${language}:`, error);
    return [];
  }
}

/**
 * Get poem data for a single poem file with validation
 */
export function getPoemBySlug(slug: string, language?: string): PoemLoadResult {
  try {
    let poemPath: string;
    
    if (language) {
      poemPath = path.join(POEMS_DIR, language, `${slug}.md`);
    } else {
      const parts = slug.split('/');
      if (parts.length > 1) {
        poemPath = path.join(POEMS_DIR, `${slug}.md`);
      } else {
        console.error(`No language provided for poem: ${slug}`);
        return {
          poem: null,
          validation: {
            isValid: false,
            errors: [{
              field: 'language',
              message: 'Language must be specified'
            }]
          }
        };
      }
    }

    if (!fs.existsSync(poemPath)) {
      return {
        poem: null,
        validation: {
          isValid: false,
          errors: [{
            field: 'path',
            message: `Poem file not found: ${poemPath}`
          }]
        }
      };
    }

    const fileContents = fs.readFileSync(poemPath, 'utf8');
    
    // Validate the poem
    const validation = validatePoemStructure(fileContents);
    
    // If validation fails, return early with errors
    if (!validation.isValid) {
      console.error(`Validation errors in poem ${slug}:`, validation.errors);
      return { poem: null, validation };
    }

    // Parse the validated content
    const { data, content } = matter(fileContents);
    const filename = path.basename(slug, '.md');

    return {
      poem: {
        id: filename,
        title: data.title,
        author: data.author,
        date: new Date(data.date).toISOString(),
        form: data.form,
        language: (language || data.language) as ProgrammingLanguage,
        tags: data.tags || [],
        content: content,
        notes: {
          composition: data.notes?.composition || null,
          technical: data.notes?.technical || null,
          philosophical: data.notes?.philosophical || null,
        },
        preview: data.preview || '',
      },
      validation
    };
  } catch (error: unknown) {
    // Properly type the error and extract message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Error reading poem ${slug}:`, errorMessage);
    
    return {
      poem: null,
      validation: {
        isValid: false,
        errors: [{
          field: 'file',
          message: `Error reading poem: ${errorMessage}`
        }]
      }
    };
  }
}

/**
 * Get all poems with validation results
 */
export function getAllPoems(): Poem[] {
  try {
    const languages = fs.readdirSync(POEMS_DIR)
      .filter(dir => fs.statSync(path.join(POEMS_DIR, dir)).isDirectory());
    
    const validPoems: Poem[] = [];
    const validationErrors: Record<string, ValidationResult> = {};
    
    languages.forEach(language => {
      const files = getPoemFilesFromLanguage(language);
      files.forEach(filename => {
        const result = getPoemBySlug(filename, language);
        
        if (result.poem) {
          validPoems.push(result.poem);
        } else {
          validationErrors[`${language}/${filename}`] = result.validation;
        }
      });
    });

    // Log validation errors if any were found
    if (Object.keys(validationErrors).length > 0) {
      console.error('Validation errors found in poems:', validationErrors);
    }
    
    // Sort by date, newest first
    return validPoems.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error getting all poems:', error);
    return [];
  }
}

/**
 * Get random poem (only from valid poems)
 */
export function getRandomPoem(): Poem {
  const validPoems = getAllPoems();
  
  if (validPoems.length === 0) {
    return {
      id: 'default',
      title: 'Welcome to Poetic Source',
      author: 'System',
      date: new Date().toISOString(),
      form: 'haiku',
      language: 'javascript',
      tags: ['welcome'],
      content: '// A default poem\n// When no poems exist yet\n// Please add some today',
      notes: {},
      preview: 'Default poem when no others exist',
    };
  }
  
  const randomIndex = Math.floor(Math.random() * validPoems.length);
  return validPoems[randomIndex];
}

/**
 * Get poems by form
 */
export function getPoemsByForm(form: string): Poem[] {
  return getAllPoems().filter(poem => poem.form === form);
}

/**
 * Get summary statistics for poems by form
 */
export function getFormCategories(): CategorySummary[] {
  const validPoems = getAllPoems();
  const forms = new Set(validPoems.map(poem => poem.form));

  return Array.from(forms).map(form => {
    const poemsInForm = validPoems.filter(poem => poem.form === form);
    return {
      name: form,
      count: poemsInForm.length,
      description: formDescriptions[form as PoemForm],
      poems: poemsInForm
    };
  });
}

/**
 * Get poems by programming language
 */
export function getPoemsByLanguage(language: ProgrammingLanguage): Poem[] {
  const poemFiles = getPoemFilesFromLanguage(language);
  const validPoems = poemFiles
    .map(filename => getPoemBySlug(filename, language))
    .filter((result): result is { poem: Poem; validation: ValidationResult } => 
      result.poem !== null
    )
    .map(result => result.poem)
    .sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return validPoems;
}

/**
 * Get summary statistics for poems by programming language
 */
export function getLanguageCategories(): CategorySummary[] {
  const allPoems = getAllPoems();
  const languages = new Set(allPoems.map(poem => poem.language));
  const descriptions = getLanguageDescriptions();

  return Array.from(languages).map(language => {
    const poemsInLanguage = allPoems.filter(poem => poem.language === language);
    return {
      name: language,
      count: poemsInLanguage.length,
      description: descriptions[language as ProgrammingLanguage],
      poems: poemsInLanguage
    };
  });
}

/**
 * Get poems for a specific category
 */
export function getPoemsForCategory(
  categoryType: 'form' | 'language',
  categoryName: PoemForm | ProgrammingLanguage
): Poem[] {
  const allPoems = getAllPoems();
  return allPoems.filter(poem =>
    categoryType === 'form'
      ? poem.form === categoryName
      : poem.language === categoryName
  );
}

/**
 * Get poems by tag
 */
export function getPoemsByTag(tag: string): Poem[] {
  return getAllPoems().filter(poem => poem.tags.includes(tag));
}

/**
 * Helper function to ensure poems directory structure exists
 */
export function ensurePoemsDirectoryStructure(): void {
  // Get languages from ProgrammingLanguage type
  const languages = Object.keys(languageMetadata) as ProgrammingLanguage[];

  try {
    // Create main poems directory if it doesn't exist
    if (!fs.existsSync(POEMS_DIR)) {
      fs.mkdirSync(POEMS_DIR);
    }

    // Create language subdirectories
    languages.forEach(lang => {
      const langDir = path.join(POEMS_DIR, lang);
      if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir);
        console.log(`Created directory structure for ${langDir} language`);
      }
    });
  } catch (error) {
    console.error('Error creating directory structure:', error);
  }
}