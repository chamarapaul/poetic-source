// src/lib/syntax/tokenizers/languages/java.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
  // Comments
  [/\/\/[^\n]*/, 'comment'],
  [/\/\*[\s\S]*?\*\//, 'comment'],

  // Keywords
  [
    /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
    'keyword',
  ],

  // Built-in types and values
  [/\b(true|false|null)\b/, 'builtin'],

  // String literals
  [/"[^"]*"/, 'string'],
  [/'[^']*'/, 'string'],

  // Numbers
  [/\b\d+(\.\d+)?([eE][+-]?\d+)?\b/, 'number'],

  // Method calls and declarations
  [/\b[A-Za-z_]\w*(?=\s*\()/, 'function'],

  // Class names (capitalized identifiers)
  [/\b[A-Z]\w*\b/, 'type'],

  // Annotations
  [/@[A-Za-z_]\w*/, 'attribute'],

  // Operators
  [/[+\-*/%=!<>?:&|^~]+/, 'operator'],

  // Punctuation
  [/[{}[\]();,.]/, 'punctuation'],

  // Variables/identifiers (should be last to not override other patterns)
  [/\b[A-Za-z_]\w*\b/, 'variable'],
];

export const javaTokenize = createTokenizer(patterns);
