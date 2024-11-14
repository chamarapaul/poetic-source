// src/lib/validation/forms/rubai.ts
import { ProgrammingLanguage } from '@/lib/types';
import { PoeticLine, extractPoeticLines } from '../utils';

interface RubaiValidationError {
  message: string;
  line?: number;
  severity: 'error' | 'warning';
}

interface RubaiValidationResult {
  isValid: boolean;
  errors: RubaiValidationError[];
  lines: PoeticLine[];
}

/**
 * Validates a Rubaʿi poem's basic structure:
 * - Four meaningful lines forming a complete thought
 * - Additional lines may exist for code structure but should be minimal
 */
export function validateRubai(
  content: string, 
  language: ProgrammingLanguage
): RubaiValidationResult {
  const errors: RubaiValidationError[] = [];
  const poeticLines = extractPoeticLines(content, language);
  
  // Check minimum structure
  if (poeticLines.length < 4) {
    errors.push({
      message: 'Rubaʿi must have at least four meaningful lines',
      severity: 'error'
    });
  }

  // Warn if there are many more than 4 meaningful lines
  if (poeticLines.length > 6) {
    errors.push({
      message: 'Consider condensing to stay closer to the four-line Rubaʿi form',
      severity: 'warning'
    });
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
    lines: poeticLines
  };
}