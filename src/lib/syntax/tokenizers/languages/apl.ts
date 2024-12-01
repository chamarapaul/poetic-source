// src/lib/syntax/tokenizers/apl.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
  // Comments (APL uses ⍝)
  [/⍝.*$/, 'comment'],
  // Assignment arrow and other operators
  [/[←→]/, 'operator'],
  // APL special operators and symbols
  [/[×÷∘∣∼⍳⌈⌊∪∩⊂⊃∊⍴~↑↓⍱⍲⍒⍋⌽⊖⍉⊗⍟⍱⍲≤≥≠⌿¨]/, 'operator'],
  // System commands
  [/^[\)][\w\d]+/, 'keyword'],
  // Strings in single quotes
  [/'[^']*'/, 'string'],
  // APL-style numbers (including high minus)
  [/¯?[\d\.]+([eE][+¯]?\d+)?/, 'number'],
  // Special syntax for array/matrix formation
  [/[⋄,\[\]\{\}]/, 'punctuation'],
  // Variables and identifiers
  [/[A-Za-z][A-Za-z0-9_]*/, 'variable'],
];

export const aplTokenize = createTokenizer(patterns);
