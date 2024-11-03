// lib/types.ts
export type PoemForm = 'haiku' | 'tanka' | 'renga' | 'koan' | 'ghazal';
export type ProgrammingLanguage = 'algol' | 'python' | 'javascript' | 'ruby' | 'haskell' | 'lisp';

export interface Poem {
    id: string;
    title: string;
    author: string;
    date: string;
    form: PoemForm;
    language: ProgrammingLanguage;
    tags: string[];
    content: string;
    notes: {
        composition?: string;
        technical?: string;
        philosophical?: string;
    };
    path: string;
    preview: string;
}