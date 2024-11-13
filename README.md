# Poetic Source

Where algorithms meet poetry, and syntax becomes art. Poetic Source is a platform that celebrates the intersection of programming and poetry, showcasing code that is both functionally elegant and poetically expressive.

## About

Poetic Source explores the creative possibilities that emerge when we treat code as a form of poetic expression. Each piece in the collection is both a valid program and a carefully crafted poem, demonstrating that technical precision and artistic beauty can coexist in the realm of programming.

## Features

The collection includes various poetic forms:
  - Haikus (5-7-5 syllables)
  - Tankas (5-7-5-7-7 syllables)
  - Koans (paradoxical puzzles)
  - Ghazals (repeated patterns)
  - Renga (linked verse)
  - Free Verse

Written across multiple programming languages:
  - Modern Synthesis: Swift, Go, JavaScript
  - Natural Flow: Python, Ruby, Kotlin
  - Structured Elegance: ALGOL-68, Ada, Java
  - Visual Expression: APL, Befunge
  - System Dialogues: C, C++, Objective-C
  - Symbolic Patterns: Lisp, SQL

Each poem includes:
  - Composition notes
  - Technical explanations
  - Philosophical insights
  - Language-specific context

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chamarapaul/poetic-source.git
cd poetic-source
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure

```
poetic-source/
├── src/
│   ├── components/    # React components
│   ├── lib/          # Utility functions and types
│   ├── pages/        # Next.js pages
│   └── styles/       # Global styles
├── poems/            # Markdown files containing poems
└── scripts/         
```

### Testing

```bash
npm test    
npm test:watch    # Run tests in watch mode
```

## Contributing

### Creative Exploration

Code poetry is an exciting and evolving art form that combines the precision of programming with the expressive power of poetry. As a contributor to Poetic Source, you have the opportunity to explore the creative possibilities that emerge when we treat code as a poetic medium.

I encourage you to experiment with different programming languages, poetic forms, and computer science concepts to discover new ways of expressing ideas and emotions through code. Consider how the constraints of syntax and structure can be used to create meaning and beauty, and how the underlying principles of programming can be reinterpreted through a poetic lens.

Your contributions to this project can help expand the boundaries of what is possible at the intersection of art and technology. By sharing your unique perspective and creative voice, you can inspire others to see the poetic potential in code and contribute to the growing community of code poets.

So, let your imagination run free, and don't be afraid to push the limits of what code poetry can be. I look forward to seeing the innovative and thought-provoking works that you create!

### Adding a New Poem

If you'd like to add your own code poetry:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-poem`)

3. Create a new markdown file in the appropriate language directory under `poems/` using this frontmatter template:
```markdown
---
id: "slug"
title: "Your Poem Title"
author: "'Your Name'|'Chatbot Name'"
date: "YYYY-MM-DDTHH:MM:SSZ"
form: "haiku|tanka|koan|ghazal|renga|freeverse"
language: "ada|algol68|apl|befunge|c|cpp|go|java|javascript|kotlin|lisp|objectivec|python|ruby|sql|swift"
tags: 
  - tag1
  - tag2
preview: "Brief description of your poem"
notes:
  composition: "Notes about the poetic composition"
  technical: "Technical explanation of the code"
  philosophical: "Deeper meaning and interpretation"
---
Your code poem here...
```

4. Ensure your poem follows these guidelines:
- Must generally follow the syntax rules in the chosen language
- Must follow the constraints of the chosen [poetic form](http://poeticsource.com/forms)
- Should include meaningful comments that contribute to the poetry
- Should explore deeper meanings in computer science concepts

5. Commit your changes (`git commit -am 'Add new poem'`)
6. Push to the branch (`git push origin feature/new-poem`)
7. Create a Pull Request

## Technical Details

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Typescript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shad/ui components](https://ui.shadcn.com/) - UI Components
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - Icons
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Markdown processing
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer) - Syntax highlighting
- [Jest](https://jestjs.io/) - Testing

## License

TBD

## Acknowledgments

- Inspired by the intersection of code and poetry
- Built with assistance from [Claude AI](https://www.anthropic.com) - AI Assistance in code poem generation and site development

---

Made with ❤️ by Chamara Paul