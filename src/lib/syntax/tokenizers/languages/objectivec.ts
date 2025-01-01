// src/lib/syntax/tokenizers/objectivec.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
  // Comments
  [/\/\/[^\n]*|\/\*[\s\S]*?\*\//, 'comment'],

  // Strings (including @"string")
  [/@?"(?:[^"\\]|\\.)*"/, 'string'],

  // Objective-C directives and special keywords (must come before regular keywords)
  [/@(?:interface|implementation|protocol|end|property|autoreleasepool|class|selector|synthesize|dynamic|encode|synchronized|try|catch|finally|throw)\b/, 'keyword'],

  // Framework classes and types (must come before variables)
  [/\b(?:NS[A-Z]\w+|UI[A-Z]\w+|CG[A-Z]\w+|CA[A-Z]\w+)\b/, 'type'],

  // Common Foundation types
  [/\b(?:NSInteger|NSUInteger|NSObject|NSString|NSArray|NSDictionary|NSNumber|BOOL|NSNotFound)\b/, 'type'],

  // Language keywords
  [/\b(?:if|else|return|self|void|int|unsigned|long|double|float|char|const|static|extern|typedef|struct|enum|class|protocol|id|nil|Nil|YES|NO|IBOutlet|IBAction|nonatomic|strong|weak|copy|assign|readonly|readwrite)\b/, 'keyword'],

  // Method parameters with types (must come before plain variables)
  [/(?<=:)\s*\(\s*[^)]+\s*\)\s*\w+/, 'variable'],

  // Method selectors with colons
  [/\b\w+(?=:)/, 'function'],

  // Numbers (including hex)
  [/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlL]?\b|\b0x[\da-fA-F]+[lL]?\b/, 'number'],

  // Operators
  [/[><=?:!+\-*/%&|^~]/, 'operator'],

  // Method call brackets and other punctuation
  [/[\[\](){};,.]/, 'punctuation'],

  // Remaining identifiers
  [/[a-zA-Z_]\w*/, 'variable']
];

export const objectiveCTokenize = createTokenizer(patterns);