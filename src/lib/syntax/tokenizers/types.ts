// src/lib/syntax/tokenizers/types.ts

// Define token types for better type safety
export interface Token {
  content: string;
  type: TokenType;
  className?: string;
}

export type TokenType =
  | 'plain'
  | 'comment'
  | 'string'
  | 'keyword'
  | 'operator'
  | 'number'
  | 'function'
  | 'variable'
  | 'builtin'
  | 'attribute'
  | 'symbol'
  | 'punctuation'
  | 'preprocessor'
  | 'method-definition'
  | 'property'
  | 'message'
  | 'block'
  | 'protocol'
  | 'framework'
  | 'type'
  | 'special-form'
  | 'lambda-list'
  | 'module';

export type CustomClassesMap = Record<TokenType, string>;

export interface TokenizerUtils {
  findNextToken: (
    slice: string,
    patterns: [RegExp, TokenType][]
  ) => { match: string; type: TokenType; length: number } | null;
}
