// components/poems/display/CodeBlock.tsx
import { Highlight, type Language, themes } from 'prism-react-renderer';
import React from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

// Define token types for better type safety
interface Token {
  content: string;
  type: TokenType;
  className?: string;
}

type TokenType =
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

// Create a type for the custom classes mapping
type CustomClassesMap = Record<TokenType, string>;

// Helper function to find the next token
function findNextToken(
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

// Custom syntax rules for Ada
function adaTokenize(code: string): Token[][] {
  const patterns: [RegExp, TokenType][] = [
    [/--[^\n]*/, 'comment'],
    [/"[^"]*"/, 'string'],
    [
      /\b(abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|new|not|null|of|or|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
      'keyword',
    ],
    [
      /\b(Boolean|Integer|Natural|Positive|Float|Character|String|Duration)\b/,
      'type',
    ],
    [
      /'(Access|Address|Aft|Alignment|Base|Bit_Order|Body_Version|Callable|Caller|Component_Size|Compose|Constrained|Copy_Sign|Count|Definite|Delta|Denorm|Digits|Exponent|External_Tag|First|First_Bit|Floor|Fore|Fraction|Identity|Image|Input|Last|Last_Bit|Leading_Part|Length|Machine_Emax|Machine_Emin|Machine_Mantissa|Machine_Overflows|Machine_Radix|Machine_Rounds|Max|Max_Size_In_Storage_Elements|Min|Model|Model_Emin|Model_Epsilon|Model_Mantissa|Model_Small|Modulus|Output|Partition_ID|Pos|Position|Pred|Range|Read|Remainder|Round|Rounding|Safe_First|Safe_Last|Scale|Scaling|Signed_Zeros|Size|Small|Storage_Pool|Storage_Size|Stream_Size|Succ|Tag|Terminated|Truncation|Unbiased_Rounding|Unchecked_Access|Val|Valid|Value|Version|Wide_Image|Wide_Value|Wide_Width|Width|Write)\b/,
      'attribute',
    ],
    [/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, 'number'],
    [/:=|[+\-*\/]=?|<[=>]?|>=?|&|\.|\|/, 'operator'],
    [/\b[A-Za-z]\w*(?=\s+:\s+\w+\s+is\b)/, 'function'],
  ];

  return code.split('\n').map((line) => {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < line.length) {
      const slice = line.slice(pos);
      const nextToken = findNextToken(slice, patterns);

      if (nextToken) {
        tokens.push({
          content: nextToken.match,
          type: nextToken.type,
        });
        pos += nextToken.length;
      } else {
        tokens.push({
          content: line[pos],
          type: 'plain',
        });
        pos += 1;
      }
    }

    return tokens;
  });
}

// Custom syntax rules for ALGOL 68
/**
 * ALGOL 68 Code Poetry Tokenizer
 *
 * Rules for tokenizing ALGOL 68 code poetry:
 *
 * 1. Language Keywords (always capitalized and highlighted):
 *    - Structure: MODE, PROC, BEGIN, END, STRUCT
 *    - Control flow: IF, THEN, ELSE, FI
 *    - Error handling: ON, DO, OD
 *    - Types: VOID, REAL, INT, STRING
 *    - Type modifiers: REF, FLEX
 *    - Special values: NIL, SKIP
 *    - Built-in functions when used as calls: print()
 *
 * 2. Poetic Elements (always lowercase, not highlighted):
 *    - Procedure names even if they contain spaces ("recursive dreams")
 *    - Variable names
 *    - Metaphorical statements ("water flows to ice")
 *    - Prepositions and articles when used poetically
 *    - Function parameters and string content
 *    - The word "error" in error handling constructs
 *
 * 3. Comments:
 *    - All content within comments remains lowercase
 *    - Used for koans, questions, and poetic annotations
 *    - Preserve original formatting and indentation
 *
 * 4. Format Preservation:
 *    - Maintain original line breaks for poetic rhythm
 *    - Preserve spaces in identifiers when used poetically
 *    - Keep semicolons as both code separators and poetic pauses
 */
function algol68Tokenize(code: string): Token[][] {
  const customClasses: CustomClassesMap = {
    plain: 'text-[#d6deeb]', // Light blue-gray for default text
    keyword: 'text-[#c792ea] font-bold', // Purple for keywords
    type: 'text-[#7fdbca]', // Cyan for types
    comment: 'text-[#637777] italic', // Gray for comments
    string: 'text-[#addb67]', // Green for strings
    operator: 'text-[#89ddff] font-bold', // Bright blue for operators
    number: 'text-[#f78c6c]', // Orange for numbers
    function: 'text-[#82aaff] font-bold', // Blue for functions/procedures
    builtin: 'text-[#ffd700]', // Gold for built-in functions
    punctuation: 'text-[#7c8495]', // Gray for punctuation
    variable: 'text-[#d6deeb]', // Default color for variables
    symbol: 'text-[#89ddff]', // Same as operators
    attribute: '', // Not used in ALGOL 68
    preprocessor: '', // Not used in ALGOL 68
    'method-definition': '', // Not used in ALGOL 68
    property: '', // Not used in ALGOL 68
    message: '', // Not used in ALGOL 68
    block: '', // Not used in ALGOL 68
    protocol: '', // Not used in ALGOL 68
    framework: '', // Not used in ALGOL 68
    'special-form': '', // Not used in ALGOL 68
    'lambda-list': '', // Not used in ALGOL 68
    module: '', // Not used in ALGOL 68
  };

  const patterns: [RegExp, TokenType][] = [
    // Comments
    [/#[^\n]*/, 'comment'],
    [/CO[^C]*CO/, 'comment'],

    // Core ALGOL 68 keywords (case sensitive)
    [
      /\b(PROC|BEGIN|END|IF|THEN|ELSE|FI|DO|OD|CASE|IN|OUT|ESAC|PAR|MODE|REF|STRUCT|UNION|WHILE|FOR|FROM|TO|BY|NIL|ON|FLEX|SKIP)\b/,
      'keyword',
    ],

    // Types (case sensitive)
    [
      /\b(VOID|INT|REAL|BOOL|STRING|BITS|BYTES|FORMAT|FILE|CHANNEL|SEMA)\b/,
      'type',
    ],

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

  return code.split('\n').map((line) => {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < line.length) {
      const slice = line.slice(pos);
      const nextToken = findNextToken(slice, patterns);

      if (nextToken) {
        tokens.push({
          content: nextToken.match,
          type: nextToken.type,
          className:
            customClasses[nextToken.type as keyof CustomClassesMap] || '',
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
}

// Custom syntax rules for APL
function aplTokenize(code: string): Token[][] {
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

  return code.split('\n').map((line) => {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < line.length) {
      const slice = line.slice(pos);
      const nextToken = findNextToken(slice, patterns);

      if (nextToken) {
        tokens.push({
          content: nextToken.match,
          type: nextToken.type,
        });
        pos += nextToken.length;
      } else {
        tokens.push({
          content: line[pos],
          type: 'plain',
        });
        pos += 1;
      }
    }

    return tokens;
  });
}

// Add Befunge tokenizer
function befungeTokenize(code: string): Token[][] {
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

  return code.split('\n').map((line) => {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < line.length) {
      const slice = line.slice(pos);
      const nextToken = findNextToken(slice, patterns);

      if (nextToken) {
        tokens.push({
          content: nextToken.match,
          type: nextToken.type,
        });
        pos += nextToken.length;
      } else {
        tokens.push({
          content: line[pos],
          type: 'plain',
        });
        pos += 1;
      }
    }

    return tokens;
  });
}

// Custom syntax rules for Lisp
function lispTokenize(code: string): Token[][] {
  const customClasses: CustomClassesMap = {
    plain: 'text-[#d6deeb]', // Default text color
    comment: 'text-[#637777] italic', // Gray italics for comments
    string: 'text-[#addb67]', // Green for strings
    'special-form': 'text-[#c792ea] font-bold', // Purple bold for special forms
    function: 'text-[#82aaff]', // Blue for functions
    'lambda-list': 'text-[#7fdbca]', // Cyan for lambda list keywords
    symbol: 'text-[#ff869a]', // Pink for symbols
    number: 'text-[#f78c6c]', // Orange for numbers
    punctuation: 'text-[#7c8495]', // Gray for parentheses
    // Rest of token types with empty strings
    keyword: '',
    operator: '',
    variable: '',
    builtin: '',
    attribute: '',
    preprocessor: '',
    'method-definition': '',
    property: '',
    message: '',
    block: '',
    protocol: '',
    framework: '',
    type: '',
    module: '',
  };

  const patterns: [RegExp, TokenType][] = [
    // Comments first to avoid interference
    [/;.*$/, 'comment'],

    // Special forms (core language constructs)
    [
      /\b(if|cond|let|let\*|lambda|defun|defmacro|quote|eval-when|progn|prog1|prog2|block|return-from|catch|throw|unwind-protect|case|typecase|multiple-value-bind)\b/,
      'special-form',
    ],

    // Functions
    [
      /\b(car|cdr|cons|consp|and|eq|not|append|reverse|member|assoc|mapcar|mapc|reduce|remove|find|length|atom|numberp|symbolp|listp|stringp|characterp|zerop|plusp|minusp|oddp|evenp|random|rem|min|max|abs|sin|cos|tan|expt|exp|log|sqrt|floor|ceiling|truncate|round|format|print|write|read|eval|apply|funcall)\b/,
      'function',
    ],

    // Lambda list keywords - special case for 't' to ensure it's standalone
    [
      /\b(nil|null|&optional|&rest|&key|&allow-other-keys|&aux|&body|&environment|&whole)\b|\bt\b(?![-\w])/,
      'lambda-list',
    ],

    // Quoted symbols
    [/'(?![A-Za-z-])[A-Za-z][A-Za-z0-9-]*\b/, 'symbol'],

    // Strings
    [/"[^"]*"/, 'string'],

    // Numbers
    [/[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, 'number'],

    // Parentheses
    [/[()]/, 'punctuation'],
  ];

  return code.split('\n').map((line) => {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < line.length) {
      const slice = line.slice(pos);
      const nextToken = findNextToken(slice, patterns);

      if (nextToken) {
        tokens.push({
          content: nextToken.match,
          type: nextToken.type,
          className:
            customClasses[nextToken.type as keyof CustomClassesMap] || '',
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
}

// Custom syntax rules for Objective-C
function objectiveCTokenize(code: string): Token[][] {
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

  return code.split('\n').map((line) => {
    const tokens: Token[] = [];
    let pos = 0;

    while (pos < line.length) {
      const slice = line.slice(pos);
      const nextToken = findNextToken(slice, patterns);

      if (nextToken) {
        tokens.push({
          content: nextToken.match,
          type: nextToken.type,
        });
        pos += nextToken.length;
      } else {
        tokens.push({
          content: line[pos],
          type: 'plain',
        });
        pos += 1;
      }
    }

    return tokens;
  });
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = true,
}) => {
  // Map languages to their best-fit Prism language for fallback
  const languageMap: { [key: string]: Language } = {
    ada: 'pascal',
    algol68: 'plaintext',
    apl: 'apl',
    befunge: 'plaintext',
    lisp: 'plaintext',
    objectivec: 'objectivec',
    c: 'c',
    cpp: 'cpp',
    go: 'go',
    java: 'java',
    javascript: 'javascript',
    kotlin: 'kotlin',
    python: 'python',
    ruby: 'ruby',
    sql: 'sql',
    swift: 'swift',
  };

  // Determine if we should use custom highlighting
  const shouldUseCustomHighlighting = (lang: string): boolean => {
    const customHighlightCases: { [key: string]: boolean } = {
      ada: true,
      algol68: true,
      apl: true,
      befunge: true,
      lisp: true,
      objectivec: true,
    };

    return customHighlightCases[lang] || false;
  };

  // Use custom highlighting only when necessary
  if (shouldUseCustomHighlighting(language)) {
    const tokens =
      language === 'ada'
        ? adaTokenize(code)
        : language === 'algol68'
          ? algol68Tokenize(code)
          : language === 'apl'
            ? aplTokenize(code)
            : language === 'befunge'
              ? befungeTokenize(code)
              : language === 'lisp'
                ? lispTokenize(code)
                : language === 'objectivec'
                  ? objectiveCTokenize(code)
                  : // If somehow we get here without a proper tokenizer, use Prism's default
                    [];

    // Only render custom highlighting if we got tokens
    if (tokens.length > 0) {
      return (
        <pre className="overflow-x-auto p-4 rounded-lg bg-[#011627] text-[#d6deeb]">
          {tokens.map((line, i) => (
            <div key={i} className="table-row">
              {showLineNumbers && (
                <span className="table-cell text-right pr-4 select-none opacity-50 text-sm">
                  {i + 1}
                </span>
              )}
              <span className="table-cell">
                {line.map((token, j) => (
                  <span
                    key={j}
                    className={
                      token.className ??
                      (token.type === 'comment'
                        ? 'text-[#637777]'
                        : token.type === 'string'
                          ? 'text-[#addb67]'
                          : token.type === 'keyword'
                            ? 'text-[#c792ea] font-bold'
                            : token.type === 'operator'
                              ? 'text-[#7fdbca] font-bold'
                              : token.type === 'number'
                                ? 'text-[#f78c6c]'
                                : token.type === 'function'
                                  ? 'text-[#82aaff]'
                                  : token.type === 'variable'
                                    ? 'text-[#addb67]'
                                    : '')
                    }
                  >
                    {token.content}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      );
    }
  }

  // Get base language for Prism
  const prismLanguage = languageMap[language] || 'typescript';

  return (
    <Highlight
      theme={themes.nightOwl}
      code={code.trim()}
      language={prismLanguage}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre
          className={`${className} overflow-x-auto p-4 rounded-lg`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} className="table-row">
              {showLineNumbers && (
                <span className="table-cell text-right pr-4 select-none opacity-50 text-sm">
                  {i + 1}
                </span>
              )}
              <span className="table-cell">
                {line.map((token, j) => {
                  const tokenProps = getTokenProps({ token });
                  return <span key={j} {...tokenProps} />;
                })}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
