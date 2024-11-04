// lib/types.ts

// Poetic Forms
export type PoemForm = 
  | 'haiku' 
  | 'tanka' 
  | 'renga' 
  | 'koan' 
  | 'ghazal'
  | 'free verse';

export const formDescriptions: Record<PoemForm, string> = {
  haiku: '5-7-5 syllables, perfect for concise algorithms',
  tanka: '5-7-5-7-7 syllables, good for multi-step algorithms',
  ghazal: 'Repeated patterns mirror recursive functions',
  koan: 'Explores paradoxes in computer science',
  renga: 'Linked verse for connected operations',
  'free verse': 'Unrestricted form for complex concepts'
};

// Programming Languages
export type ProgrammingLanguage = 
  | 'ALGOL-68' 
  | 'APL'
  | 'C'
  | 'C++'
  | 'haskell'
  | 'java'
  | 'JavaScript'
  | 'lisp'
  | 'objective-c'
  | 'python'
  | 'ruby'
  | 'Swift';

export const languageDescriptions: Record<ProgrammingLanguage, string> = {
  'ALGOL-68': 'Classic algorithmic language, where structured programming began',
  APL: 'Dense, symbolic notation that turns algorithms into visual poetry',
  C: 'Pure, fundamental expressions close to the machine',
  'C++': 'Power and abstraction that spans paradigms',
  haskell: 'Pure functional programming with mathematical elegance',
  java: 'Object-oriented patterns that build complex architectures',
  JavaScript: 'Dynamic, asynchronous poetry that weaves through promise chains and closures',
  lisp: 'Symbolic expressions that blur the line between code and data',
  'objective-c': 'Message-passing philosophy with explicit intent',
  python: 'Clear, readable syntax that flows like natural language',
  ruby: 'Elegant, expressive code that prioritizes programmer happiness',
  Swift: 'Modern clarity meets powerful expression'
};

export interface LanguageMetadata {
    yearCreated: number;
    paradigms: string[];
    influences: string[];
    creator: string;
    description: string;
  }
  
//   export const languageMetadata: Record<ProgrammingLanguage, LanguageMetadata> = {
//     apl: {
//       yearCreated: 1962,
//       paradigms: ['array', 'functional', 'symbolic'],
//       influences: ['mathematical notation', 'linear algebra'],
//       creator: 'Kenneth E. Iverson',
//       description: 'Dense, symbolic notation that turns algorithms into visual poetry'
//     },
//     python: {
//       yearCreated: 1991,
//       paradigms: ['object-oriented', 'imperative', 'functional'],
//       influences: ['ABC', 'C', 'Haskell'],
//       creator: 'Guido van Rossum',
//       description: 'Clear, readable syntax that flows like natural language'
//     },
//     javascript: {
//       yearCreated: 1995,
//       paradigms: ['multi-paradigm', 'event-driven', 'functional'],
//       influences: ['Self', 'Scheme', 'Java'],
//       creator: 'Brendan Eich',
//       description: 'Dynamic, asynchronous poetry that weaves through promise chains and closures'
//     },
//     cpp: {
//       yearCreated: 1985,
//       paradigms: ['multi-paradigm', 'object-oriented', 'generic'],
//       influences: ['C', 'Simula', 'Ada'],
//       creator: 'Bjarne Stroustrup',
//       description: 'Power and abstraction that spans paradigms'
//     },
//     // ... other languages
//   };

// Metadata structure for poems
// - composition: Explains the poetic structure and writing choices
// - technical: Details the programming concepts and techniques used
// - philosophical: Explores deeper meanings and connections
export interface PoemNotes {
    composition?: string;
    technical?: string;
    philosophical?: string;
  }

// Represents a code poem in the Poetic Source collection.
// Each poem combines elements of both poetry and programming, expressing
// ideas through both natural and programming languages.
export interface Poem {
    id: string; //Unique identifier for the poem, used in URLs and references
    title: string;
    author: string;
    date: string;
    form: PoemForm;
    language: ProgrammingLanguage;
    tags: string[];
    content: string;
    notes: PoemNotes;
    path: string;
    preview: string; //Short description for use in listings and cards
}

// Category summary type for browse pages
export interface CategorySummary {
    name: string;
    count: number;
    description: string;
    poems: Poem[];
  }