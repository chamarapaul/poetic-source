// lib/types.ts

// Poetic Forms
export type PoemForm =
    | 'haiku'
    | 'tanka'
    | 'renga'
    | 'koan'
    | 'ghazal'
    | 'freeverse';

export const getFormDisplayName = (form: PoemForm): string => {
    switch (form) {
        case 'freeverse':
            return 'Free Verse';
        default:
            return form.charAt(0).toUpperCase() + form.slice(1);
    }
};

export const formDescriptions: Record<PoemForm, string> = {
    haiku: '5-7-5 syllables, perfect for concise algorithms',
    tanka: '5-7-5-7-7 syllables, good for multi-step algorithms',
    ghazal: 'Repeated patterns mirror recursive functions',
    koan: 'Explores paradoxes in computer science',
    renga: 'Linked verse for connected operations',
    freeverse: 'Unrestricted form for complex concepts'
};

export interface PoemFormStructure {
    rules: string[];
    codeConsiderations: string[];
    example?: string;
}

export const formStructureInfo: Record<PoemForm, PoemFormStructure> = {
    haiku: {
        rules: [
            "Three lines of 5, 7, and 5 syllables",
            "Often contains a seasonal reference",
            "Presents a single, clear image or feeling"
        ],
        codeConsiderations: [
            "Works well for simple functions or operations",
            "Each line can represent a step in a small algorithm",
            "Comments can be used to maintain syllable structure"
        ],
        example: "# where paths split in code #\nif choice points the way\n# truth flows on silver streams #"
    },
    tanka: {
        rules: [
            "Five lines of 5, 7, 5, 7, 7 syllables",
            "Builds on haiku with two additional lines",
            "Often more personal and emotional than haiku"
        ],
        codeConsiderations: [
            "Suitable for algorithms with setup and results",
            "Extra lines allow for more complex operations",
            "Can include both operation and its outcome"
        ]
    },
    renga: {
        rules: [
            "Begins with a hokku (5-7-5)",
            "Followed by multiple stanzas",
            "Links between verses are important",
            "Traditionally written collaboratively"
        ],
        codeConsiderations: [
            "Perfect for representing multi-step algorithms",
            "Each verse can handle a different part of the process",
            "Links between verses can show data flow"
        ]
    },
    koan: {
        rules: [
            "Presents a paradox or puzzle",
            "Often includes a surprising turn",
            "Questions common assumptions",
            "May not have a clear resolution"
        ],
        codeConsiderations: [
            "Excellent for exploring recursive concepts",
            "Can demonstrate programming paradoxes",
            "Works well with self-referential code"
        ]
    },
    ghazal: {
        rules: [
            "Series of couplets with repeating refrain",
            "Each couplet is independent yet connected",
            "Often deals with love and longing",
            "Complex internal rhyme schemes"
        ],
        codeConsiderations: [
            "Good for repetitive operations with variations",
            "Can represent different cases of same operation",
            "Refrain can echo core programming concept"
        ]
    },
    freeverse: {
        rules: [
            "No fixed pattern of rhyme or meter",
            "Freedom to break conventional rules",
            "Emphasis on natural rhythm",
            "Structure serves the content"
        ],
        codeConsiderations: [
            "Flexible format for complex algorithms",
            "Can follow natural flow of code",
            "Allows focus on clarity of expression"
        ]
    }
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
    | 'algol68'
    | 'ada'
    | 'apl'
    | 'befunge'
    | 'c'
    | 'cpp'
    | 'go'
    | 'java'
    | 'javascript'
    | 'kotlin'
    | 'lisp'
    | 'objectivec'
    | 'python'
    | 'ruby'
    | 'sql'
    | 'swift';

export const getLanguageDisplayName = (language: ProgrammingLanguage): string => {
    const displayNames: Record<ProgrammingLanguage, string> = {
        algol68: 'ALGOL-68',
        ada: 'Ada',
        apl: 'APL',
        befunge: "Befunge",
        c: 'C',
        cpp: 'C++',
        go: 'Go',
        java: 'Java',
        javascript: 'JavaScript',
        kotlin: 'Kotlin',
        lisp: 'Lisp',
        objectivec: 'Objective-C',
        python: 'Python',
        ruby: 'Ruby',
        sql: 'SQL',
        swift: 'Swift'
    };
    return displayNames[language];
};

export interface LanguageMetadata {
    yearCreated: number;
    paradigms: string[];
    influences: string[];
    creator: string;
    description: string;
}

export const languageMetadata: Record<ProgrammingLanguage, LanguageMetadata> = {
    'algol68': {
        yearCreated: 1968,
        paradigms: ['imperative', 'structured', 'concurrent'],
        influences: ['ALGOL 60', 'ALGOL W', 'CPL'],
        creator: 'Adriaan van Wijngaarden',
        description: 'Classic algorithmic language, where structured programming began'
    },
    'ada': {
        yearCreated: 1983,
        paradigms: ['structured', 'imperative', 'concurrent'],
        influences: ['Pascal', 'ALGOL 68', 'Green'],
        creator: 'Jean Ichbiah, Tucker Taft, Christine Anderson',
        description: 'Elegant precision with mathematical roots, where reliability becomes poetry'
    },
    'apl': {
        yearCreated: 1962,
        paradigms: ['array', 'functional', 'symbolic'],
        influences: ['mathematical notation', 'linear algebra'],
        creator: 'Kenneth E. Iverson',
        description: 'Dense, symbolic notation that turns algorithms into visual poetry'
    },
    'befunge': {
        yearCreated: 1993,
        paradigms: ['stack-based', 'two-dimensional', 'reflective'],
        influences: ['Forth', 'Brainfuck'],
        creator: 'Chris Pressey',
        description: 'A two-dimensional language where code flows in multiple directions, creating visual patterns that are both executable and aesthetically meaningful'
    },
    'c': {
        yearCreated: 1972,
        paradigms: ['procedural', 'structured', 'imperative'],
        influences: ['B', 'BCPL', 'Assembly'],
        creator: 'Dennis Ritchie',
        description: 'Pure, fundamental expressions close to the machine'
    },
    'cpp': {
        yearCreated: 1985,
        paradigms: ['multi-paradigm', 'object-oriented', 'generic'],
        influences: ['C', 'Simula', 'Ada'],
        creator: 'Bjarne Stroustrup',
        description: 'Power and abstraction that spans paradigms'
    },
    'go': {
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
    'javascript': {
        yearCreated: 1995,
        paradigms: ['multi-paradigm', 'event-driven', 'functional'],
        influences: ['Self', 'Scheme', 'Java'],
        creator: 'Brendan Eich',
        description: 'Dynamic, asynchronous poetry that weaves through promise chains and closures'
    },
    'kotlin': {
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
    'objectivec': {
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
    'sql': {
        yearCreated: 1974,
        paradigms: ['declarative', 'set-based', 'relational'],
        influences: ['relational algebra', 'SEQUEL', 'SQUARE'],
        creator: 'Patricia McQueen, Donald Chamberlin, Raymond Boyce',
        description: 'Declarative verses that weave relationships between data and meaning'
    },
    'swift': {
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
    name: PoemForm | ProgrammingLanguage;
    count: number;
    description: string;
    poems: Poem[];
}