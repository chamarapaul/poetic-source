// src/lib/validation/forms/haiku.ts
import { ProgrammingLanguage } from '../../types';
import { PoeticLine, extractPoeticLines } from '../utils';

interface HaikuValidationError {
  message: string;
  line?: number;
  severity: 'error' | 'warning';
}

interface HaikuValidationResult {
  isValid: boolean;
  errors: HaikuValidationError[];
  lines: PoeticLine[];
}

/**
 * Validates a haiku poem's structure:
 * - Three meaningful lines forming a complete thought
 * - Extracted from code, comments, or strings
 */
export function validateHaiku(
  content: string,
  language: ProgrammingLanguage
): HaikuValidationResult {
  const errors: HaikuValidationError[] = [];
  const poeticLines = extractPoeticLines(content, language);

  // Check minimum structural requirements
  if (poeticLines.length < 3) {
    errors.push({
      message: 'Haiku must have at least three meaningful lines',
      severity: 'error'
    });
    return { isValid: false, errors, lines: poeticLines };
  }

  // Check for reasonable line distribution
  if (poeticLines.length > 5) {
    errors.push({
      message: 'Haiku seems to have too many meaningful lines. Consider condensing the expression',
      severity: 'warning'
    });
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
    lines: poeticLines
  };
}