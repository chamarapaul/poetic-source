// lib/poems.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Poem } from './types';

const poemsDirectory = path.join(process.cwd(), 'poems');

/**
 * Get all poem files from the poems directory
 */
// export function getPoemFiles(): string[] {
//   return fs.readdirSync(poemsDirectory);
// }

export function getPoemFiles(): string[] {
    try {
      if (!fs.existsSync(poemsDirectory)) {
        console.log('Creating poems directory...');
        fs.mkdirSync(poemsDirectory, { recursive: true });
        return [];
      }
      return fs.readdirSync(poemsDirectory).filter(file => file.endsWith('.md'));
    } catch (error) {
      console.error('Error reading poem files:', error);
      return [];
    }
  }

/**
 * Get poem data for a single poem file
 */
// export function getPoemBySlug(slug: string): Poem {
//     const realSlug = slug.replace(/\.md$/, '');
//     const fullPath = path.join(poemsDirectory, `${realSlug}.md`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
//     const { data, content } = matter(fileContents);
  
//     return {
//       id: realSlug,
//       title: data.title,
//       author: data.author,
//       date: data.date.toISOString(), // Ensure date is a string
//       form: data.form,
//       language: data.language,
//       tags: data.tags || [],
//       content: content,
//       notes: {
//         composition: data.notes?.composition,
//         technical: data.notes?.technical,
//         philosophical: data.notes?.philosophical,
//       },
//       path: `/poems/${realSlug}`,
//       preview: data.preview || '',
//     };
//   }

export function getPoemBySlug(slug: string): Poem | null {
    try {
      const realSlug = slug.replace(/\.md$/, '');
      const fullPath = path.join(poemsDirectory, `${realSlug}.md`);
      
      if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return null;
      }
  
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
  
      // Validate required fields
      if (!data.title || !data.author || !data.date) {
        console.error(`Missing required fields in ${slug}`, data);
        return null;
      }
  
      return {
        id: realSlug,
        title: data.title || '',
        author: data.author || '',
        date: new Date(data.date).toISOString(),
        form: data.form || 'unknown',
        language: data.language || 'unknown',
        tags: data.tags || [],
        content: content || '',
        notes: {
          composition: data.notes?.composition || null,
          technical: data.notes?.technical || null,
          philosophical: data.notes?.philosophical || null,
        },
        path: `/poems/${realSlug}`,
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
// export function getAllPoems(): Poem[] {
//     const slugs = getPoemFiles();
//     const poems = slugs
//       .map((slug) => getPoemBySlug(slug))
//       // Sort by date in reverse chronological order
//       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//     return poems;
//   }
  export function getAllPoems(): Poem[] {
    const slugs = getPoemFiles();
    const poems = slugs
      .map((slug) => getPoemBySlug(slug))
      .filter((poem): poem is Poem => poem !== null) // Filter out null poems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return poems;
  }

/**
 * Get a random poem
 */
// export function getRandomPoem(): Poem {
//     const poems = getAllPoems();
//     if (poems.length === 0) {
//       // Return a default poem if no poems are found
//       return {
//         id: 'default',
//         title: 'Welcome to Poetic Source',
//         author: 'System',
//         date: new Date().toISOString(), // Using ISO string format
//         form: 'haiku',
//         language: 'javascript',
//         tags: ['welcome'],
//         content: '// A default poem\n// When no poems exist yet\n// Please add some soon',
//         notes: {},
//         path: '/poems/default',
//         preview: 'Default poem when no others exist',
//       };
//     }
//     const randomIndex = Math.floor(Math.random() * poems.length);
//     return poems[randomIndex];
//   }

export function getRandomPoem(): Poem {
    const defaultPoem: Poem = {
      id: 'default',
      title: 'Welcome to Poetic Source',
      author: 'System',
      date: new Date().toISOString(),
      form: 'haiku',
      language: 'javascript',
      tags: ['welcome'],
      content: '// A default poem\n// When no poems exist yet\n// Please add some soon',
      notes: {},
      path: '/poems/default',
      preview: 'Default poem when no others exist',
    };
  
    try {
      const poems = getAllPoems();
      if (poems.length === 0) {
        console.log('No poems found, returning default poem');
        return defaultPoem;
      }
      const randomIndex = Math.floor(Math.random() * poems.length);
      return poems[randomIndex];
    } catch (error) {
      console.error('Error getting random poem:', error);
      return defaultPoem;
    }
  }

/**
 * Get poems by form
 */
export function getPoemsByForm(form: string): Poem[] {
  return getAllPoems().filter(poem => poem.form === form);
}

/**
 * Get poems by programming language
 */
export function getPoemsByLanguage(language: string): Poem[] {
  return getAllPoems().filter(poem => poem.language === language);
}

/**
 * Get poems by tag
 */
export function getPoemsByTag(tag: string): Poem[] {
  return getAllPoems().filter(poem => poem.tags.includes(tag));
}