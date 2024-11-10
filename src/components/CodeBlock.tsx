// components/CodeBlock.tsx
import React from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';

interface CodeBlockProps {
    code: string;
    language: string;
    showLineNumbers?: boolean;
}

// Define token types for better type safety
interface Token {
    content: string;
    type: TokenType;
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

// Helper function to find the next token
function findNextToken(
    slice: string,
    patterns: [RegExp, TokenType][]
): { match: string; type: TokenType; length: number } | null {
    for (const [pattern, type] of patterns) {
        const match = slice.match(pattern);
        if (match && match.index === 0) { // Only match at the start of the string
            return {
                match: match[0],
                type,
                length: match[0].length
            };
        }
    }
    return null;
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
        [/[A-Za-z][A-Za-z0-9_]*/, 'variable']
    ];

    return code.split('\n').map(line => {
        const tokens: Token[] = [];
        let pos = 0;

        while (pos < line.length) {
            const slice = line.slice(pos);
            const nextToken = findNextToken(slice, patterns);

            if (nextToken) {
                tokens.push({
                    content: nextToken.match,
                    type: nextToken.type
                });
                pos += nextToken.length;
            } else {
                tokens.push({
                    content: line[pos],
                    type: 'plain'
                });
                pos += 1;
            }
        }

        return tokens;
    });
}

// Custom syntax rules for Ada
function adaTokenize(code: string): Token[][] {
    const patterns: [RegExp, TokenType][] = [
        [/--[^\n]*/, 'comment'],
        [/"[^"]*"/, 'string'],
        [/\b(abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|new|not|null|of|or|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i, 'keyword'],
        [/\b(Boolean|Integer|Natural|Positive|Float|Character|String|Duration)\b/, 'type'],
        [/'(Access|Address|Aft|Alignment|Base|Bit_Order|Body_Version|Callable|Caller|Component_Size|Compose|Constrained|Copy_Sign|Count|Definite|Delta|Denorm|Digits|Exponent|External_Tag|First|First_Bit|Floor|Fore|Fraction|Identity|Image|Input|Last|Last_Bit|Leading_Part|Length|Machine_Emax|Machine_Emin|Machine_Mantissa|Machine_Overflows|Machine_Radix|Machine_Rounds|Max|Max_Size_In_Storage_Elements|Min|Model|Model_Emin|Model_Epsilon|Model_Mantissa|Model_Small|Modulus|Output|Partition_ID|Pos|Position|Pred|Range|Read|Remainder|Round|Rounding|Safe_First|Safe_Last|Scale|Scaling|Signed_Zeros|Size|Small|Storage_Pool|Storage_Size|Stream_Size|Succ|Tag|Terminated|Truncation|Unbiased_Rounding|Unchecked_Access|Val|Valid|Value|Version|Wide_Image|Wide_Value|Wide_Width|Width|Write)\b/, 'attribute'],
        [/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, 'number'],
        [/:=|[+\-*\/]=?|<[=>]?|>=?|&|\.|\|/, 'operator'],
        [/\b[A-Za-z]\w*(?=\s+:\s+\w+\s+is\b)/, 'function']
    ];

    return code.split('\n').map(line => {
        const tokens: Token[] = [];
        let pos = 0;

        while (pos < line.length) {
            const slice = line.slice(pos);
            const nextToken = findNextToken(slice, patterns);

            if (nextToken) {
                tokens.push({
                    content: nextToken.match,
                    type: nextToken.type
                });
                pos += nextToken.length;
            } else {
                tokens.push({
                    content: line[pos],
                    type: 'plain'
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
        [/[<>v^]/, 'operator'],     // Directional operators
        [/[+\-*\/%!`]/, 'operator'], // Arithmetic operators
        [/[:\\$.]/, 'operator'],     // Stack operators
        [/"[^"]*"/, 'string'],      // String mode
        [/[0-9]/, 'number'],        // Numbers
        [/@/, 'keyword'],           // Program end
        [/[pg]/, 'function'],       // Get/put value
        [/[&~]/, 'builtin'],        // I/O operations
    ];

    return code.split('\n').map(line => {
        const tokens: Token[] = [];
        let pos = 0;

        while (pos < line.length) {
            const slice = line.slice(pos);
            const nextToken = findNextToken(slice, patterns);

            if (nextToken) {
                tokens.push({
                    content: nextToken.match,
                    type: nextToken.type
                });
                pos += nextToken.length;
            } else {
                tokens.push({
                    content: line[pos],
                    type: 'plain'
                });
                pos += 1;
            }
        }

        return tokens;
    });
}

// Custom syntax rules for Lisp
function lispTokenize(code: string): Token[][] {
    const patterns: [RegExp, TokenType][] = [
        [/;.*$/, 'comment'],
        [/"[^"]*"/, 'string'],
        [/\((if|cond|let|let\*|lambda|defun|defmacro|quote|eval-when|progn|prog1|prog2|block|return-from|catch|throw|unwind-protect|case|typecase|multiple-value-bind)\b/, 'special-form'],
        [/\b(car|cdr|cons|list|append|reverse|member|assoc|mapcar|mapc|reduce|remove|find|position|length|null|atom|numberp|symbolp|listp|consp|stringp|characterp|zerop|plusp|minusp|oddp|evenp|random|rem|min|max|abs|sin|cos|tan|expt|exp|log|sqrt|floor|ceiling|truncate|round|format|print|write|read|eval|apply|funcall)\b/, 'function'],
        [/\b(nil|t|&optional|&rest|&key|&allow-other-keys|&aux|&body|&environment|&whole)\b/, 'lambda-list'],
        [/'[^()\s]+/, 'symbol'],
        [/[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, 'number'],
        [/[()]/, 'punctuation']
    ];

    return code.split('\n').map(line => {
        const tokens: Token[] = [];
        let pos = 0;

        while (pos < line.length) {
            const slice = line.slice(pos);
            const nextToken = findNextToken(slice, patterns);

            if (nextToken) {
                tokens.push({
                    content: nextToken.match,
                    type: nextToken.type
                });
                pos += nextToken.length;
            } else {
                tokens.push({
                    content: line[pos],
                    type: 'plain'
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
        [/\b(id|Class|SEL|IMP|BOOL|self|super|nil|NIL|YES|NO|@interface|@implementation|@protocol|@end|@private|@protected|@public|@package|@optional|@required|@synthesize|@dynamic|@property|@selector|@encode|@synchronized|@try|@catch|@finally|@throw|@class|@compatibility_alias)\b/, 'keyword'],
        [/\b(if|else|switch|case|default|break|continue|return|goto|while|do|for|in|typedef|struct|enum|union|unsigned|signed|long|short|volatile|const|auto|register|static|extern|void|char|int|float|double|instancetype|strong|weak|assign|copy|nonatomic|atomic|readonly|readwrite|unsafe_unretained|retain)\b/, 'keyword'],
        [/\b(NS[A-Z]\w+|UI[A-Z]\w+|CG[A-Z]\w+|CA[A-Z]\w+)\b/, 'framework'],
        [/\b(NSString|NSArray|NSDictionary|NSNumber|NSSet|NSData|NSDate|NSError|NSURLRequest|NSURLResponse|NSOutputStream|NSInputStream|NSThread|NSLock|NSBundle|NSFileManager)\b/, 'builtin'],
        [/\[\s*[^\[\]]*?\s+[^\[\]]+?\]/, 'message'],
        [/^[-+]\s*\([^)]+\)/, 'method-definition'],
        [/@property\s*\([^)]+\)/, 'property'],
        [/\^\s*(?:\([^)]*\))?\s*\{|\}/, 'block'],
        [/<[^>]+>/, 'protocol'],
        [/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlL]?\b|\b0x[\da-fA-F]+[lL]?\b/, 'number']
    ];

    return code.split('\n').map(line => {
        const tokens: Token[] = [];
        let pos = 0;

        while (pos < line.length) {
            const slice = line.slice(pos);
            const nextToken = findNextToken(slice, patterns);

            if (nextToken) {
                tokens.push({
                    content: nextToken.match,
                    type: nextToken.type
                });
                pos += nextToken.length;
            } else {
                tokens.push({
                    content: line[pos],
                    type: 'plain'
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
    showLineNumbers = true
}) => {
    // Map languages to their best-fit Prism language for fallback
    const languageMap: { [key: string]: Language } = {
        'algol68': 'clike',
        'apl': 'apl',
        'ada': 'pascal',
        'befunge': 'plaintext',
        'lisp': 'lisp',
        'objectivec': 'objectivec',
        'c': 'c',
        'cpp': 'cpp',
        'go': 'go',
        'java': 'java',
        'javascript': 'javascript',
        'kotlin': 'kotlin',
        'python': 'python',
        'ruby': 'ruby',
        'sql': 'sql',
        'swift': 'swift',
    };

    // Determine if we should use custom highlighting
    const shouldUseCustomHighlighting = (lang: string): boolean => {
        const customHighlightCases: { [key: string]: boolean } = {
            'apl': true,      // APL's unique symbols need custom handling
            'ada': true,      // Custom handling for Ada-specific features
            'befunge': true,  // Support for directional characters and operations
            'lisp': false,    // Native Lisp support is good
            'objectivec': true, // Custom handling for better Cocoa/iOS features
        };

        return customHighlightCases[lang] || false;
    };

    // Use custom highlighting only when necessary
    if (shouldUseCustomHighlighting(language)) {
        const tokens =
            language === 'apl' ? aplTokenize(code) :
                language === 'ada' ? adaTokenize(code) :
                    language === 'befunge' ? befungeTokenize(code) :
                        language === 'objectivec' ? objectiveCTokenize(code) :
                            // If somehow we get here without a proper tokenizer, use Prism's default
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
                                            token.type === 'comment' ? 'text-[#637777]' :
                                                token.type === 'string' ? 'text-[#addb67]' :
                                                    token.type === 'keyword' ? 'text-[#c792ea] font-bold' :
                                                        token.type === 'operator' ? 'text-[#7fdbca] font-bold' :
                                                            token.type === 'number' ? 'text-[#f78c6c]' :
                                                                token.type === 'function' ? 'text-[#82aaff]' :
                                                                    token.type === 'variable' ? 'text-[#addb67]' :
                                                                        ''
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
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} overflow-x-auto p-4 rounded-lg`} style={style}>
                    {tokens.map((line, i) => (
                        <div
                            key={i}
                            {...getLineProps({ line, key: i })}
                            className="table-row"
                        >
                            {showLineNumbers && (
                                <span className="table-cell text-right pr-4 select-none opacity-50 text-sm">
                                    {i + 1}
                                </span>
                            )}
                            <span className="table-cell">
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({
                                            token,
                                            key
                                        })}
                                    />
                                ))}
                            </span>
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};

export default CodeBlock;