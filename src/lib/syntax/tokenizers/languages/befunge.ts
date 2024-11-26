// src/lib/syntax/tokenizers/befunge.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
    [/#.*$/, 'comment'],
    [/[<>v^]/, 'operator'], // Directional operators
    [/[+\-*\/%!`]/, 'operator'], // Arithmetic operators
    [/[:\\$.]/, 'operator'], // Stack operators
    [/"[^"]*"/, 'string'], // String mode
    [/[0-9]/, 'number'], // Numbers
    [/@/, 'keyword'], // Program end
    [/[pg]/, 'function'], // Get/put value
    [/[&~]/, 'builtin'], // I/O operations
];

export const befungeTokenize = createTokenizer(patterns);