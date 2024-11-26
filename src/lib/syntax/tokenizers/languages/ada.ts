// src/lib/syntax/tokenizers/ada.ts
import { createTokenizer } from '../base';
import { TokenType } from '../types';

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

export const adaTokenize = createTokenizer(patterns);