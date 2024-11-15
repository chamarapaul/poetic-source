// lib/types.ts

// Poetic Forms
export const POEM_FORMS = [
    'ghazal',
    'haiku',
    'koan',
    'rubai',
    'tanka',
    'freeverse'
] as const;

export type PoemForm = typeof POEM_FORMS[number];

export const getFormDisplayName = (form: PoemForm): string => {
    switch (form) {
        case 'rubai':
            return 'Rubaʿi';
        case 'freeverse':
            return 'Free Verse';
        default:
            return form.charAt(0).toUpperCase() + form.slice(1);
    }
};

export const formDescriptions: Record<PoemForm, string> = {
    ghazal: 'Repeated patterns mirror recursive functions',
    haiku: '5-7-5 syllables, perfect for concise algorithms',
    koan: 'Explores paradoxes in computer science',
    rubai: 'Four-line mathematical-mystical form bridging computation and cosmic truth',
    tanka: '5-7-5-7-7 syllables, good for multi-step algorithms',
    freeverse: 'Unrestricted form for complex concepts'
};

export interface PoemFormStructure {
    rules: string[];
    codeConsiderations: string[];
    example?: string;
}

export const formStructureInfo: Record<PoemForm, PoemFormStructure> = {
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
        ],
        example: "# Contains 3 linked couplets with \"-old\" rhyme/refrain\n\ndef search():\n   return truth.unfold()\nwhile stars.align():\n   paths.behold()\ntry peace.await():\n   dreams.unfold()"
        // example is in python
    },
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
        example: "# morning light breaks through    # 5 syllables\nif time.flows_between_the_stars():    # 7 syllables\n# shadows dance and fade    # 5 syllables"
        // example is in python
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
    rubai: {
        rules: [
            "Four lines (quatrain) with AABA or AAAA rhyme pattern",
            "First, second, and fourth lines rhyme",
            "Often structured as: statement, elaboration, pivot, conclusion",
            "Traditionally explores philosophical or metaphysical themes"
        ],
        codeConsiderations: [
            "First two lines can establish a computational concept",
            "Third line can introduce a twist or different perspective",
            "Final line often reveals deeper meaning or returns to initial concept",
            "Function definitions, error handling, or async operations work well with this structure"
        ],
        example: "def call() -> Sign:             # A\n    let morning_stars.align():    # A\n        while time.flies_away()    # B\n        return light.design()    # A"
        //example is in python
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
export const PROGRAMMING_LANGUAGES = [
    'ada',
    'algol68',
    'apl',
    'befunge',
    'c',
    'cpp',
    'go',
    'java',
    'javascript',
    'kotlin',
    'lisp',
    'objectivec',
    'python',
    'ruby',
    'sql',
    'swift'
] as const;

export type ProgrammingLanguage = typeof PROGRAMMING_LANGUAGES[number];

export const getLanguageDisplayName = (language: ProgrammingLanguage): string => {
    const displayNames: Record<ProgrammingLanguage, string> = {
        ada: 'Ada',
        algol68: 'ALGOL 68',
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

export type PoeticGroup =
    | 'Visual Expression'
    | 'Natural Flow'
    | 'Structured Elegance'
    | 'Symbolic Patterns'
    | 'Modern Synthesis'
    | 'System Dialogues';

export interface PoeticCharacteristic {
    group: PoeticGroup;
    color: string;
}

export const poeticGroupMetadata: Record<PoeticGroup, {
    description: string;
    features: string[];
}> = {
    'Visual Expression': {
        description: 'Languages where spatial arrangement and visual patterns form part of the poetic expression',
        features: ['Unique symbols', 'Spatial layouts', 'Visual patterns']
    },
    'Natural Flow': {
        description: 'Languages designed for readability that naturally lend themselves to poetic expression',
        features: ['Readable syntax', 'Expressive structures', 'Fluid composition']
    },
    'Structured Elegance': {
        description: 'Languages where formal structure and strong typing create poetic constraints',
        features: ['Formal patterns', 'Type-based metaphors', 'Structured composition']
    },
    'Symbolic Patterns': {
        description: 'Languages that excel at pattern manipulation and symbolic transformation',
        features: ['Pattern matching', 'Symbolic processing', 'Declarative expression']
    },
    'Modern Synthesis': {
        description: 'Contemporary languages that blend multiple paradigms for flexible poetic expression',
        features: ['Mixed paradigms', 'Modern syntax', 'Flexible structures']
    },
    'System Dialogues': {
        description: 'Languages that create poetry through direct interaction with system concepts',
        features: ['Memory metaphors', 'Hardware poetry', 'System interactions']
    }
};

export const poeticCharacteristics: Record<ProgrammingLanguage, PoeticCharacteristic> = {
    'ada': { group: 'Structured Elegance', color: 'bg-emerald-50 text-emerald-700' },
    'algol68': { group: 'Structured Elegance', color: 'bg-emerald-50 text-emerald-700' },
    'apl': { group: 'Visual Expression', color: 'bg-purple-50 text-purple-700' },
    'befunge': { group: 'Visual Expression', color: 'bg-purple-50 text-purple-700' },
    'c': { group: 'System Dialogues', color: 'bg-red-50 text-red-700' },
    'cpp': { group: 'System Dialogues', color: 'bg-red-50 text-red-700' },
    'go': { group: 'Modern Synthesis', color: 'bg-indigo-50 text-indigo-700' },
    'java': { group: 'Structured Elegance', color: 'bg-emerald-50 text-emerald-700' },
    'javascript': { group: 'Modern Synthesis', color: 'bg-indigo-50 text-indigo-700' },
    'kotlin': { group: 'Natural Flow', color: 'bg-blue-50 text-blue-700' },
    'lisp': { group: 'Symbolic Patterns', color: 'bg-amber-50 text-amber-700' },
    'objectivec': { group: 'System Dialogues', color: 'bg-red-50 text-red-700' },
    'python': { group: 'Natural Flow', color: 'bg-blue-50 text-blue-700' },
    'ruby': { group: 'Natural Flow', color: 'bg-blue-50 text-blue-700' },
    'sql': { group: 'Symbolic Patterns', color: 'bg-amber-50 text-amber-700' },
    'swift': { group: 'Modern Synthesis', color: 'bg-indigo-50 text-indigo-700' },
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