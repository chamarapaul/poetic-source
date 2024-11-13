// scripts/validate-poems.ts
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { validatePoemStructure, ValidationError } from '../src/lib/validation/poem';
import { ProgrammingLanguage } from '../src/lib/types';

const POEMS_DIR: string = path.join(process.cwd(), 'poems');

interface ValidationResult {
  filePath: string;
  language: ProgrammingLanguage;
  errors: ValidationError[];
}

function validateAllPoems() {
  const validationResults: ValidationResult[] = [];
  let totalPoemsChecked = 0;
  
  // Process each language directory
  fs.readdirSync(POEMS_DIR)
    .filter(dir => fs.statSync(path.join(POEMS_DIR, dir)).isDirectory())
    .forEach(language => {
      const languageDir = path.join(POEMS_DIR, language);
      
      // Process each poem file in the language directory
      fs.readdirSync(languageDir)
        .filter(file => file.endsWith('.md'))
        .forEach(file => {
          totalPoemsChecked++;
          const filePath = path.join(languageDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          
          const validation = validatePoemStructure(content);
          if (!validation.isValid) {
            validationResults.push({
              filePath: path.relative(process.cwd(), filePath),
              language: language as ProgrammingLanguage,
              errors: validation.errors
            });
          }
        });
    });

  return {
    results: validationResults,
    totalChecked: totalPoemsChecked
  };
}

function printValidationResults(results: ValidationResult[], totalChecked: number) {
  if (results.length === 0) {
    console.log(chalk.green(`✓ All ${totalChecked} poems are valid!`));
    return;
  }

  console.error(chalk.red(`✗ Found validation errors in ${results.length} of ${totalChecked} poems:\n`));
  
  results.forEach(result => {
    console.error(chalk.yellow(`File: ${result.filePath}`));
    console.error(chalk.yellow(`Language: ${result.language}\n`));
    
    result.errors.forEach(error => {
      console.error(chalk.red(`  ✗ ${error.field}: ${error.message}`));
    });
    console.error(''); // Empty line between files
  });

  // Print summary
  const totalErrors = results.reduce((sum, result) => sum + result.errors.length, 0);
  console.error(chalk.red(`Found ${totalErrors} total errors across ${results.length} files`));
}

// Add option to check specific language or file
const args = process.argv.slice(2);
const targetLanguage = args[0];

try {
  if (targetLanguage) {
    if (!fs.existsSync(path.join(POEMS_DIR, targetLanguage))) {
      console.error(chalk.red(`Language directory '${targetLanguage}' not found`));
      process.exit(1);
    }
    console.log(chalk.blue(`Validating poems for language: ${targetLanguage}\n`));
  }

  const { results, totalChecked } = validateAllPoems();
  printValidationResults(results, totalChecked);

  // Exit with error code if validation failed
  if (results.length > 0) {
    process.exit(1);
  }
} catch (error) {
  console.error(chalk.red('Error during validation:'));
  console.error(error);
  process.exit(1);
}