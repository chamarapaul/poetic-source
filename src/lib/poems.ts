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

const POEMS_DIR = path.join(process.cwd(), 'poems');

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
 * Get poem data for a single poem file
 */
export function getPoemBySlug(slug: string, language?: string): Poem | null {
  try {
    let poemPath: string;
    
    if (language) {
      // If language is provided, use it directly
      poemPath = path.join(POEMS_DIR, language, `${slug}.md`);
    } else {
      // Otherwise, try to extract language from the slug if it contains a path
      const parts = slug.split('/');
      if (parts.length > 1) {
        poemPath = path.join(POEMS_DIR, `${slug}.md`);
      } else {
        console.error(`No language provided for poem: ${slug}`);
        return null;
      }
    }

    if (!fs.existsSync(poemPath)) {
      console.error(`Poem file not found: ${poemPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(poemPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Use the filename without extension as the ID
    const filename = path.basename(slug, '.md');

    return {
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
    };
  } catch (error) {
    console.error(`Error reading poem ${slug}:`, error);
    return null;
  }
}

/**
 * Get all poems
 */
export function getAllPoems(): Poem[] {
  try {
    // Get all language directories
    const languages = fs.readdirSync(POEMS_DIR)
      .filter(dir => fs.statSync(path.join(POEMS_DIR, dir)).isDirectory());
    
    // Get poems from each language directory
    const allPoemFiles = languages.flatMap(language => {
      const files = getPoemFilesFromLanguage(language);
      return files.map(file => {
        // Extract just the filename without extension
        const filename = path.basename(file, '.md');
        return { filename, language };
      });
    });
    
    // Parse each poem file
    const poems = allPoemFiles
      .map(({ filename, language }) => getPoemBySlug(filename, language))
      .filter((poem): poem is Poem => poem !== null);
    
    // Sort by date, newest first
    return poems.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error getting all poems:', error);
    return [];
  }
}

/**
 * Get a random poem
 */
export function getRandomPoem(): Poem {
  const poems = getAllPoems();
  if (poems.length === 0) {
    // Return a default poem if no poems exist
    return {
      id: 'default',
      title: 'Welcome to Poetic Source',
      author: 'System',
      date: new Date().toISOString(),
      form: 'haiku',
      language: 'javascript',
      tags: ['welcome'],
      content: '// A default poem\n// When no poems exist yet\n// Please add some soon',
      notes: {},
      preview: 'Default poem when no others exist',
    };
  }
  const randomIndex = Math.floor(Math.random() * poems.length);
  return poems[randomIndex];
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
  const allPoems = getAllPoems();
  const forms = new Set(allPoems.map(poem => poem.form));

  return Array.from(forms).map(form => {
    const poemsInForm = allPoems.filter(poem => poem.form === form);
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
  return poemFiles
    .map(filename => getPoemBySlug(filename, language))
    .filter((poem): poem is Poem => poem !== null)
    .sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
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