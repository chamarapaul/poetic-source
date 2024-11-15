// src/lib/validation/forms/rubai.ts
import { ProgrammingLanguage } from '../../types';
import { PoeticLine, extractPoeticLines, getEndWord, rhymesWith } from '../utils';

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
      return { isValid: false, errors, lines: poeticLines };
    }
  
    // Look for a valid quatrain pattern in any sequence of 4 lines
    let foundValidPattern = false;
    for (let i = 0; i <= poeticLines.length - 4; i++) {
      const quatrain = poeticLines.slice(i, i + 4);
      const rhymePattern = findRhymePattern(quatrain);
      
      if (rhymePattern.isValid) {
        foundValidPattern = true;
        break;
      }
    }
  
    if (!foundValidPattern) {
      errors.push({
        message: 'Rubaʿi must follow either AABA or AAAA rhyme pattern. Check end rhymes of each line.',
        severity: 'error'
      });
    }
  
    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      lines: poeticLines
    };
  }

interface RhymePatternResult {
    isValid: boolean;
    pattern?: 'AABA' | 'AAAA';
}

function findRhymePattern(lines: PoeticLine[]): RhymePatternResult {
    if (lines.length < 4) return { isValid: false };

    // Get end words/tokens for each line
    const endWords = lines.map(line => getEndWord(line.content));
    
    //console.log("\nChecking quatrain end words:", endWords);

    // Check for AABA pattern
    //console.log("\nChecking AABA pattern:");
    const firstPairRhymes = rhymesWith(endWords[0], endWords[1]);
    //console.log(`First pair rhymes? ${firstPairRhymes}`);
    
    const bookendRhymes = rhymesWith(endWords[1], endWords[3]);
    //console.log(`Bookend rhymes? ${bookendRhymes}`);
    
    const middleLineUnique = !rhymesWith(endWords[2], endWords[0]);
    //console.log(`Middle line unique? ${middleLineUnique}`);

    const isAABA = firstPairRhymes && bookendRhymes && middleLineUnique;

    // Check for AAAA pattern
    //console.log("\nChecking AAAA pattern:");
    const isAAAA = endWords.every((word, i) => {
        if (i === 0) return true;
        const rhymes = rhymesWith(word, endWords[0]);
        //console.log(`Line ${i + 1} rhymes with first line? ${rhymes}`);
        return rhymes;
    });

    //console.log(`\nAABA check: ${isAABA}`);
    //console.log(`AAAA check: ${isAAAA}`);

    return {
        isValid: isAABA || isAAAA,
        pattern: isAABA ? 'AABA' : isAAAA ? 'AAAA' : undefined
    };
}