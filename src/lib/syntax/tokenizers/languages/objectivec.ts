// src/lib/syntax/tokenizers/objectivec.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

const patterns: [RegExp, TokenType][] = [
  [/\/\/[^\n]*|\/\*[\s\S]*?\*\//, 'comment'],
  [/@?"(?:[^"\\]|\\.)*"/, 'string'],
  [/^#\w+\b/, 'preprocessor'],
  [
    /\b(id|Class|SEL|IMP|BOOL|self|super|nil|NIL|YES|NO|@interface|@implementation|@protocol|@end|@private|@protected|@public|@package|@optional|@required|@synthesize|@dynamic|@property|@selector|@encode|@synchronized|@try|@catch|@finally|@throw|@class|@compatibility_alias)\b/,
    'keyword',
  ],
  [
    /\b(if|else|switch|case|default|break|continue|return|goto|while|do|for|in|typedef|struct|enum|union|unsigned|signed|long|short|volatile|const|auto|register|static|extern|void|char|int|float|double|instancetype|strong|weak|assign|copy|nonatomic|atomic|readonly|readwrite|unsafe_unretained|retain)\b/,
    'keyword',
  ],
  [/\b(NS[A-Z]\w+|UI[A-Z]\w+|CG[A-Z]\w+|CA[A-Z]\w+)\b/, 'framework'],
  [
    /\b(NSString|NSArray|NSDictionary|NSNumber|NSSet|NSData|NSDate|NSError|NSURLRequest|NSURLResponse|NSOutputStream|NSInputStream|NSThread|NSLock|NSBundle|NSFileManager)\b/,
    'builtin',
  ],
  [/\[\s*[^\[\]]*?\s+[^\[\]]+?\]/, 'message'],
  [/^[-+]\s*\([^)]+\)/, 'method-definition'],
  [/@property\s*\([^)]+\)/, 'property'],
  [/\^\s*(?:\([^)]*\))?\s*\{|\}/, 'block'],
  [/<[^>]+>/, 'protocol'],
  [
    /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlL]?\b|\b0x[\da-fA-F]+[lL]?\b/,
    'number',
  ],
];

export const objectiveCTokenize = createTokenizer(patterns);
