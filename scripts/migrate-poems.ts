// scripts/migrate-poems.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const OLD_POEMS_DIR: string = path.join(process.cwd(), 'poems');
const NEW_POEMS_DIR: string = path.join(process.cwd(), 'poems-new');

async function migratePoems(): Promise<void> {
  // Create new directory
  if (!fs.existsSync(NEW_POEMS_DIR)) {
    fs.mkdirSync(NEW_POEMS_DIR);
  }

  // Get all existing poem files
  const poemFiles: string[] = fs.readdirSync(OLD_POEMS_DIR)
    .filter((file: string) => file.endsWith('.md'));

  for (const file of poemFiles) {
    try {
      // Read poem content
      const fullPath: string = path.join(OLD_POEMS_DIR, file);
      const content: string = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(content);
      
      // Create language directory if it doesn't exist
      const languageDir: string = path.join(NEW_POEMS_DIR, data.language);
      if (!fs.existsSync(languageDir)) {
        fs.mkdirSync(languageDir);
      }
      
      // Copy file to new location
      const newPath: string = path.join(languageDir, file);
      fs.copyFileSync(fullPath, newPath);
      
      console.log(`Migrated ${file} to ${data.language}/${file}`);
    } catch (error) {
      console.error(`Error migrating ${file}:`, error);
    }
  }

  console.log('\nMigration complete!');
}

migratePoems().catch(console.error);