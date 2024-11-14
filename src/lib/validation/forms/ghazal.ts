// src/lib/validation/forms/ghazal.ts
import { ProgrammingLanguage } from '../../types';
import { extractPoeticLines, PoeticLine } from '../utils';

interface GhazalValidationError {
  message: string;
  line?: number;
  severity: 'error' | 'warning';
}

interface GhazalValidationResult {
  isValid: boolean;
  errors: GhazalValidationError[];
  couplets: Array<{
    first: PoeticLine;
    second: PoeticLine;
  }>;
}

/**
 * Validates a ghazal's poetic structure regardless of programming language.
 * Ghazal requirements:
 * - Minimum of 3 couplets (pairs of lines)
 * - Each second line should maintain a refrain or rhyme pattern
 * - Couplets should be thematically connected but independently meaningful
 */
export function validateGhazal(
  content: string, 
  language: ProgrammingLanguage
): GhazalValidationResult {
  const errors: GhazalValidationError[] = [];
  const poeticLines = extractPoeticLines(content, language);
  const couplets: Array<{ first: PoeticLine; second: PoeticLine }> = [];

  // Group lines into couplets
  for (let i = 0; i < poeticLines.length - 1; i += 2) {
    couplets.push({
      first: poeticLines[i],
      second: poeticLines[i + 1]
    });
  }

  // Check minimum length
  if (couplets.length < 3) {
    errors.push({
      message: 'Ghazal should have at least 3 couplets',
      severity: 'error'
    });
  }

  // Check for rhyme/refrain pattern
  if (couplets.length > 0) {
    const firstRefrain = getLastWord(couplets[0].second.content);
    
    couplets.slice(1).forEach((couplet, index) => {
      const currentRefrain = getLastWord(couplet.second.content);
      if (!isRefrainMatch(firstRefrain, currentRefrain)) {
        errors.push({
          message: `Couplet ${index + 2} doesn't maintain the rhyme/refrain pattern`,
          line: couplet.second.lineNumber,
          severity: 'warning'
        });
      }
    });
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
    couplets
  };
}

/**
 * Helper to get the last meaningful word of a line
 */
function getLastWord(line: string): string {
  // Remove common code endings (semicolons, parentheses, etc.)
  const cleaned = line.trim()
    .replace(/[;{}()\[\]]+$/, '')
    .trim();
  
  // Get the last word
  const words = cleaned.split(/\s+/);
  return words[words.length - 1] || '';
}

/**
 * Check if two refrains match or rhyme
 */
function isRefrainMatch(refrain1: string, refrain2: string): boolean {
  // Exact match
  if (refrain1 === refrain2) return true;

  // Remove quotes if present
  const clean1 = refrain1.replace(/["'`]/g, '');
  const clean2 = refrain2.replace(/["'`]/g, '');
  if (clean1 === clean2) return true;

  // TODO: Could add basic rhyme checking here if desired
  
  return false;
}