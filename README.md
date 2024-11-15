# Poetic Source

Where algorithms meet poetry, and syntax becomes art. Poetic Source is a platform that celebrates the intersection of programming and poetry, showcasing code that is both functionally elegant and poetically expressive.

## About

Poetic Source explores the creative possibilities that emerge when we treat code as a form of poetic expression. Each piece in the collection is both a valid program and a carefully crafted poem, demonstrating that technical precision and artistic beauty can coexist in the realm of programming.

## Features

The collection includes various poetic forms:
  - Ghazals (repeated patterns)
  - Haikus (5-7-5 syllables)
  - Koans (paradoxical puzzles)
  - Rubaʿi (mathematical-mystical quatrains)
  - Tankas (5-7-5-7-7 syllables)
  - Free Verse

Written across multiple programming languages:
  - Modern Synthesis: Swift, Go, JavaScript
  - Natural Flow: Python, Ruby, Kotlin
  - Structured Elegance: ALGOL s68, Ada, Java
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
id: "kebab-case-unique-id"
title: "Your Poem Title"
author: "'Your Name'|'Chatbot Name'"
date: "YYYY-MM-DDTHH:MM:SSZ"
form: "ghazal|haiku|koan|rubai|tanka|freeverse"
language: "ada|algol68|apl|befunge|c|cpp|go|java|javascript|kotlin|lisp|objectivec|python|ruby|sql|swift"
tags: 
  - kebab-case-tag
  - another-tag
preview: "Brief description of your poem (max 250 characters)"
notes:
  composition: "Notes about the poetic composition"
  technical: "Technical explanation of the code"
  philosophical: "Deeper meaning and interpretation"
---
Your code poem here...
```

4. Ensure your poem follows these guidelines:
- Must be placed in the correct language directory (`poems/[language]/`)
- Must generally follow the syntax rules in the chosen language
- Must follow the constraints of the chosen [poetic form](http://poeticsource.com/forms)
- Should include meaningful comments that contribute to the poetry
- Should explore deeper meanings in computer science concepts

5. Validate your poem:
   ```bash
   npm run validate-poems
   ```
   This will check:
   - Required frontmatter fields
   - Valid field formats (dates, IDs, tags)
   - Directory structure
   - Language and form validity

6. Commit your changes (`git commit -am 'Add new poem'`)
7. Push to the branch (`git push origin feature/new-poem`)
8. Create a Pull Request

### Contribution Tips
- Run validation before submitting to ensure your poem meets the requirements
- For form-specific rules, check the [forms documentation](http://poeticsource.com/forms)
- Consider using the form's constraints to enhance both the code and poetic aspects

Pull requests will be checked for:
1. Poem validation (`npm run validate-poems`)
2. Poetic form adherence
3. Creative and technical merit

## Technical Details

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Typescript](https://www.typescriptlang.org/) - Type safety
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Markdown processing
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer) - Syntax highlighting
- [shad/ui components](https://ui.shadcn.com/) - UI Components
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - Icons
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Chalk](https://www.npmjs.com/package/chalk/v/4.1.0) - Terminal styling
- [Jest](https://jestjs.io/) - Testing

## License

TBD

## Acknowledgments

- Inspired by the intersection of code and poetry
- Built with assistance from [Claude AI](https://www.anthropic.com) - AI Assistance in code poem generation and site development

---

Made with ❤️ by Chamara Paul