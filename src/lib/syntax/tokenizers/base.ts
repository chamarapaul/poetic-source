// src/lib/syntax/tokenizers/base.ts
import { CustomClassesMap, Token, TokenType } from './types';

export const DEFAULT_CLASSES: CustomClassesMap = {
  plain: 'text-[#d6deeb]', // Default text color
  comment: 'text-[#637777] italic', // Gray italics for comments
  string: 'text-[#addb67]', // Green for strings
  keyword: 'text-[#c792ea] font-bold', // Purple bold for keywords
  operator: 'text-[#89ddff] font-bold', // Bright blue bold for operators
  number: 'text-[#f78c6c]', // Orange for numbers
  function: 'text-[#82aaff]', // Blue for functions/methods
  variable: 'text-[#d7dbe0]', // Soft gray for variables
  builtin: 'text-[#ffd700]', // Gold for built-in functions
  attribute: 'text-[#addb67]', // Green for attributes
  symbol: 'text-[#89ddff]', // Bright blue for symbols
  punctuation: 'text-[#7c8495]', // Gray for punctuation
  preprocessor: 'text-[#c792ea]', // Purple for preprocessor directives
  'method-definition': 'text-[#82aaff]', // Blue for method definitions
  property: 'text-[#addb67]', // Green for properties
  message: 'text-[#82aaff]', // Blue for messages
  block: 'text-[#c792ea]', // Purple for blocks
  protocol: 'text-[#7fdbca]', // Cyan for protocols
  framework: 'text-[#82aaff]', // Blue for framework classes
  type: 'text-[#7fdbca]', // Cyan for types
  'special-form': 'text-[#c792ea] font-bold', // Purple bold for special forms
  'lambda-list': 'text-[#7fdbca]', // Cyan for lambda list keywords
  module: 'text-[#c792ea]', // Purple for modules
};

// Helper function to find the next token
export function findNextToken(
  slice: string,
  patterns: [RegExp, TokenType][]
): { match: string; type: TokenType; length: number } | null {
  for (const [pattern, type] of patterns) {
    const match = slice.match(pattern);
    if (match && match.index === 0) {
      // Only match at the start of the string
      return {
        match: match[0],
        type,
        length: match[0].length,
      };
    }
  }
  return null;
}

export function createTokenizer(
  patterns: [RegExp, TokenType][],
  customClasses: CustomClassesMap = DEFAULT_CLASSES
) {
  return function tokenize(code: string): Token[][] {
    const lines = code.split(/\r?\n/);
    return lines.map((line) => {
      if (line.trim() === '') {
        return [
          {
            content: '',
            type: 'plain',
            className: customClasses.plain,
          },
        ];
      }

      const tokens: Token[] = [];
      let pos = 0;

      while (pos < line.length) {
        const slice = line.slice(pos);
        const nextToken = findNextToken(slice, patterns);

        if (nextToken) {
          tokens.push({
            content: nextToken.match,
            type: nextToken.type,
            className: customClasses[nextToken.type] || '',
          });
          pos += nextToken.length;
        } else {
          tokens.push({
            content: line[pos],
            type: 'plain',
            className: customClasses.plain,
          });
          pos += 1;
        }
      }

      return tokens;
    });
  };
}
