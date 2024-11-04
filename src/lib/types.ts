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

// Poems
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
    preview: string; //Short description for use in listings and cards
}

export interface PoemNotes {
    composition?: string; //Explains the poetic structure and writing choices
    technical?: string; //Details the programming concepts and techniques used
    philosophical?: string; //Explores deeper meanings and connections
}

// Programming Languages
export type ProgrammingLanguage =
    | 'ALGOL-68'
    | 'Ada'
    | 'APL'
    | 'C'
    | 'C++'
    | 'Go'
    | 'java'
    | 'JavaScript'
    | 'Kotlin'
    | 'lisp'
    | 'objective-c'
    | 'python'
    | 'ruby'
    | 'SQL'
    | 'Swift';

export interface LanguageMetadata {
    yearCreated: number;
    paradigms: string[];
    influences: string[];
    creator: string;
    description: string;
}

export const languageMetadata: Record<ProgrammingLanguage, LanguageMetadata> = {
    'ALGOL-68': {
        yearCreated: 1968,
        paradigms: ['imperative', 'structured', 'concurrent'],
        influences: ['ALGOL 60', 'ALGOL W', 'CPL'],
        creator: 'Adriaan van Wijngaarden',
        description: 'Classic algorithmic language, where structured programming began'
    },
    'Ada': {
        yearCreated: 1983,
        paradigms: ['structured', 'imperative', 'concurrent'],
        influences: ['Pascal', 'ALGOL 68', 'Green'],
        creator: 'Jean Ichbiah, Tucker Taft, Christine Anderson',  
        description: 'Elegant precision with mathematical roots, where reliability becomes poetry'
      },
    'APL': {
        yearCreated: 1962,
        paradigms: ['array', 'functional', 'symbolic'],
        influences: ['mathematical notation', 'linear algebra'],
        creator: 'Kenneth E. Iverson',
        description: 'Dense, symbolic notation that turns algorithms into visual poetry'
    },
    'C': {
        yearCreated: 1972,
        paradigms: ['procedural', 'structured', 'imperative'],
        influences: ['B', 'BCPL', 'Assembly'],
        creator: 'Dennis Ritchie',
        description: 'Pure, fundamental expressions close to the machine'
    },
    'C++': {
        yearCreated: 1985,
        paradigms: ['multi-paradigm', 'object-oriented', 'generic'],
        influences: ['C', 'Simula', 'Ada'],
        creator: 'Bjarne Stroustrup',
        description: 'Power and abstraction that spans paradigms'
    },
    'Go': {
        yearCreated: 2009,
        paradigms: ['concurrent', 'imperative', 'structured'],
        influences: ['C', 'Pascal', 'Oberon'],
        creator: 'Robert Griesemer, Rob Pike, Ken Thompson',
        description: 'Simple elegance where goroutines dance in concurrent verses'
    },
    'java': {
        yearCreated: 1995,
        paradigms: ['object-oriented', 'class-based', 'concurrent'],
        influences: ['C++', 'Smalltalk', 'Objective-C'],
        creator: 'James Gosling',
        description: 'Object-oriented patterns that build complex architectures'
    },
    'JavaScript': {
        yearCreated: 1995,
        paradigms: ['multi-paradigm', 'event-driven', 'functional'],
        influences: ['Self', 'Scheme', 'Java'],
        creator: 'Brendan Eich',
        description: 'Dynamic, asynchronous poetry that weaves through promise chains and closures'
    },
    'Kotlin': {
        yearCreated: 2011,
        paradigms: ['object-oriented', 'functional', 'imperative', 'structured', 'concurrent'],
        influences: ['Java', 'Scala', 'Groovy', 'C#', 'JavaScript', 'Python'],
        creator: 'JetBrains Team led by Andrey Breslav',
        description: 'Where safety meets elegance, null bows to Maybe, and functions flow like verses through the stream of time'
    },
    'lisp': {
        yearCreated: 1958,
        paradigms: ['functional', 'meta-circular', 'symbolic'],
        influences: ['lambda calculus', 'IPL'],
        creator: 'John McCarthy',
        description: 'Symbolic expressions that blur the line between code and data'
    },
    'objective-c': {
        yearCreated: 1984,
        paradigms: ['object-oriented', 'reflective', 'message-passing'],
        influences: ['Smalltalk', 'C', 'Mesa'],
        creator: 'Brad Cox',
        description: 'Message-passing philosophy with explicit intent'
    },
    'python': {
        yearCreated: 1991,
        paradigms: ['object-oriented', 'imperative', 'functional'],
        influences: ['ABC', 'C', 'Haskell'],
        creator: 'Guido van Rossum',
        description: 'Clear, readable syntax that flows like natural language'
    },
    'ruby': {
        yearCreated: 1995,
        paradigms: ['object-oriented', 'imperative', 'functional'],
        influences: ['Smalltalk', 'Perl', 'Lisp'],
        creator: 'Yukihiro Matsumoto',
        description: 'Elegant, expressive code that prioritizes programmer happiness'
    },
    'SQL': {
        yearCreated: 1974,
        paradigms: ['declarative', 'set-based', 'relational'],
        influences: ['relational algebra', 'SEQUEL', 'SQUARE'],
        creator: 'Patricia McQueen, Donald Chamberlin, Raymond Boyce',
        description: 'Declarative verses that weave relationships between data and meaning'
      },
    'Swift': {
        yearCreated: 2014,
        paradigms: ['protocol-oriented', 'object-oriented', 'functional'],
        influences: ['Objective-C', 'Rust', 'Haskell'],
        creator: 'Chris Lattner',
        description: 'Modern clarity meets powerful expression'
    }
};

export const getLanguageDescriptions = (): Record<ProgrammingLanguage, string> => {
    return Object.fromEntries(
      Object.entries(languageMetadata).map(([lang, meta]) => [lang, meta.description])
    ) as Record<ProgrammingLanguage, string>;
  };

// Category summary type for browse pages
export interface CategorySummary {
    name: string;
    count: number;
    description: string;
    poems: Poem[];
}