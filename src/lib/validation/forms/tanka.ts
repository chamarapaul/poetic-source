// src/lib/validation/forms/tanka.ts
import { ProgrammingLanguage } from '../../types';
import { PoeticLine, extractPoeticLines } from '../utils';

interface TankaValidationError {
  message: string;
  line?: number;
  severity: 'error' | 'warning';
}

interface TankaValidationResult {
  isValid: boolean;
  errors: TankaValidationError[];
  lines: PoeticLine[];
}

/**
 * Validates a tanka poem's structure:
 * - Five meaningful lines forming a complete thought
 * - Extracted from code, comments, or strings
 */
export function validateTanka(
  content: string,
  language: ProgrammingLanguage
): TankaValidationResult {
  const errors: TankaValidationError[] = [];
  const poeticLines = extractPoeticLines(content, language);

  // Check minimum structural requirements
  if (poeticLines.length < 5) {
    errors.push({
      message: 'Tanka must have at least five meaningful lines',
      severity: 'error'
    });
    return { isValid: false, errors, lines: poeticLines };
  }

  // Check for reasonable line distribution
  if (poeticLines.length > 8) {
    errors.push({
      message: 'Tanka seems to have too many meaningful lines. Consider condensing the expression',
      severity: 'warning'
    });
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
    lines: poeticLines
  };
}