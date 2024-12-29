// src/lib/syntax/tokenizers/objectivec.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
  // Comments
  [/\/\/[^\n]*|\/\*[\s\S]*?\*\//, 'comment'],

  // Strings
  [/@?"(?:[^"\\]|\\.)*"/, 'string'],

  // Numbers
  [
    /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlL]?\b|\b0x[\da-fA-F]+[lL]?\b/,
    'number',
  ],

  // Method parameters (must come first)
  [/(?<=:)\s*\w+(?=\s|]|;|\))/, 'variable'],

  // Parameter types in parentheses
  [/\(\s*NS\w+\s*\)/, 'type'],

  // Objective-C directives
  [/(@interface|@implementation|@protocol|@end|@property)\b/, 'keyword'],

  // Framework classes and types
  [/\b(NSInteger|NSUInteger|NSObject|NSNotFound)\b/, 'type'],

  // Language keywords
  [/\b(if|return|self)\b/, 'keyword'],

  // Method selectors (with colons)
  [/\b\w+(?=:)/, 'function'],

  // Operators
  [/[>?:]/, 'operator'],

  // Opening square bracket for method calls
  [/\[/, 'punctuation'],

  // Closing square bracket for method calls
  [/\]/, 'punctuation'],

  // Parentheses
  [/[()]/, 'punctuation'],

  // Remaining identifiers
  [/[a-zA-Z_]\w*/, 'variable'],
];

export const objectiveCTokenize = createTokenizer(patterns);
