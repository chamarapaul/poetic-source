// src/lib/syntax/tokenizers/ruby.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
  // Comments
  [/#.*$/, 'comment'],

  // Strings (single and double quoted)
  [/"[^"]*"|'[^']*'/, 'string'],

  // Constants, Class names, and Error types (to take precedence over keywords)
  [/\b[A-Z][A-Za-z0-9_]*\b/, 'type'],

  // Keywords (with strict word boundaries)
  [
    /\b(?:class|def|module|if|else|elsif|end|begin|rescue|ensure|do|while|until|for|in|unless|case|when|break|next|return|yield|super|self|nil|true|false|and|or|not|alias|undef|BEGIN|END)\b/,
    'keyword',
  ],

  // Built-in methods
  [
    /\b(?:puts|print|require|require_relative|include|extend|attr_accessor|attr_reader|attr_writer|raise|fail|catch|throw|loop|lambda|proc)\b/,
    'builtin',
  ],

  // Symbols
  [/:[a-zA-Z_]\w*/, 'symbol'],

  // Numbers
  [/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\b0x[\da-fA-F]+\b/, 'number'],

  // Operators
  [/&&|\|\||=~|=>|<<|>>|\*\*|[-+*\/%=<>!&|^~]=?/, 'operator'],

  // Method calls and definitions
  [/\b[a-z_]\w*[!?]?(?=\s*[({])/, 'function'],

  // Instance variables
  [/(?:^|\s)@[a-zA-Z_]\w*/, 'variable'],

  // Punctuation
  [/[{}\[\]().,;]/, 'punctuation'],

  // Block parameters
  [/\|\s*(?:[a-z_]\w*(?:\s*,\s*[a-z_]\w*)*)\s*\|/, 'variable'],
];

export const rubyTokenize = createTokenizer(patterns);
