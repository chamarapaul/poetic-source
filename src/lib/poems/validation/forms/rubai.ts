// src/lib/poems/validation/forms/rubai.ts
import { ProgrammingLanguage } from '../../types';
import {
  PoeticLine,
  extractPoeticLines,
  getEndWord,
  rhymesWith,
} from '../utils';

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
 * Validates a Rubaʿi poem's structure:
 * - Four meaningful lines forming a complete thought
 * - AABA or AAAA rhyme pattern
 * - Pattern can be carried by code, comments, or a mix of both
 */
export function validateRubai(
  content: string,
  language: ProgrammingLanguage
): RubaiValidationResult {
  const errors: RubaiValidationError[] = [];
  const poeticLines = extractPoeticLines(content, language);

  // Check minimum structure with more lenient warning
  if (poeticLines.length < 4) {
    errors.push({
      message: 'Rubaʿi should ideally have at least four meaningful lines',
      severity: 'warning',
    });
  }

  // Look for a valid quatrain pattern in any consecutive four lines
  let foundValidPattern = false;
  for (let i = 0; i <= Math.max(0, poeticLines.length - 4); i++) {
    const quatrain = poeticLines.slice(i, i + 4);
    const rhymePattern = findRhymePattern(quatrain);

    if (rhymePattern.isValid) {
      foundValidPattern = true;
      break;
    }
  }

  if (!foundValidPattern && poeticLines.length >= 4) {
    errors.push({
      message: 'Consider maintaining AABA or AAAA rhyme pattern in the lines',
      severity: 'warning',
    });
  }

  return {
    isValid: true, // Always return valid but with warnings if needed
    errors,
    lines: poeticLines,
  };
}

interface RhymePatternResult {
  isValid: boolean;
  pattern?: 'AABA' | 'AAAA';
}

function findRhymePattern(lines: PoeticLine[]): RhymePatternResult {
  if (lines.length < 4) return { isValid: false };

  // Extract end words, cleaning up both code and comment elements
  const endWords = lines.map((line) => {
    let content = line.content;

    // If it's a comment, clean up comment markers
    if (line.type === 'comment' || content.includes('//')) {
      content = content.replace(/\/\/\s*/, '');
    }

    // Clean up code-specific elements
    content = content
      .replace(/[{};(),\[\]]/g, '') // Remove code punctuation
      .replace(/\s*->\s*\w+\s*:?$/, '') // Remove return type annotations
      .replace(/\s*:\s*$/, '') // Remove trailing colons
      .trim();

    return getEndWord(content);
  });

  // Check for AAAA pattern first
  const isAAAA = endWords.every((word, i) => {
    if (i === 0) return true;
    return rhymesWith(word, endWords[0]);
  });

  // Check for AABA pattern
  const isAABA =
    rhymesWith(endWords[0], endWords[1]) &&
    rhymesWith(endWords[1], endWords[3]) &&
    !rhymesWith(endWords[2], endWords[0]);

  return {
    isValid: isAABA || isAAAA,
    pattern: isAAAA ? 'AAAA' : isAABA ? 'AABA' : undefined,
  };
}
