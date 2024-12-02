// src/lib/syntax/tokenizers/algol68.ts
import { createTokenizer } from '../base';
import { Token, TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
  // All comment variations
  [/¢[^¢]*¢/, 'comment'],
  [/COMMENT[^C]*COMMENT/, 'comment'],
  [/CO[^C]*CO/, 'comment'],
  [/#[^\n]*#/, 'comment'],
  [/£[^£]*£/, 'comment'],

  // Core ALGOL 68 keywords
  [
    /\b(PROC|BEGIN|END|IF|THEN|ELSE|FI|DO|OD|CASE|IN|OUT|ESAC|PAR|MODE|REF|STRUCT|UNION|WHILE|FOR|FROM|TO|BY|NIL|ON|FLEX|SKIP|LOC)\b/,
    'keyword',
  ],

  // Built-in types
  [
    /\b(VOID|INT|REAL|BOOL|STRING|BITS|BYTES|FORMAT|FILE|CHANNEL|SEMA)\b/,
    'type',
  ],

  // Match PROC declarations more accurately
  [/(?<=PROC\s+)[A-Za-z][A-Za-z0-9\s]*(?=\s*=)/, 'function'],

  // Match MODE declarations
  [/(?<=MODE\s+)[A-Za-z][A-Za-z0-9]*(?=\s*=)/, 'type'],

  // Built-in procedures
  [/\b(print|read|newline|space|backspace)\b/i, 'builtin'],

  // Operators and punctuation
  [/:=|=|;|,|:|\(|\)/, 'punctuation'],

  // String literals
  [/"[^"]*"/, 'string'],

  // Numbers
  [/-?\d+(\.\d+)?([eE][+-]?\d+)?/, 'number'],

  // Variables/identifiers come last
  [/\b[A-Za-z][A-Za-z0-9]*\b/, 'variable'],
];

export const algol68Tokenize = createTokenizer(patterns);
