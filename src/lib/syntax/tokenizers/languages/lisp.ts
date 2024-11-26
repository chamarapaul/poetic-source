// src/lib/syntax/tokenizers/lisp.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

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

export const lispTokenize = createTokenizer(patterns);