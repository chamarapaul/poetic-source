// src/lib/validation/forms/ghazal.ts
import { ProgrammingLanguage } from '../../types';
import {
  PoeticLine,
  extractPoeticLines,
  getEndWord,
  rhymesWith,
} from '../utils';

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
      second: poeticLines[i + 1],
    });
  }

  // Check minimum length
  if (couplets.length < 3) {
    errors.push({
      message: 'Ghazal should have at least 3 couplets',
      severity: 'error',
    });
  }

  // Check for rhyme/refrain pattern
  if (couplets.length > 0) {
    const firstRefrain = getEndWord(couplets[0].second.content);

    couplets.slice(1).forEach((couplet, index) => {
      const currentRefrain = getEndWord(couplet.second.content);
      if (!rhymesWith(firstRefrain, currentRefrain)) {
        errors.push({
          message: `Couplet ${index + 2} doesn't maintain the rhyme pattern`,
          line: couplet.second.lineNumber,
          severity: 'warning',
        });
      }
    });
  }

  return {
    isValid: errors.filter((e) => e.severity === 'error').length === 0,
    errors,
    couplets,
  };
}
