# Poetic Source

Where algorithms meet poetry, and syntax becomes art. Poetic Source is a platform that celebrates the intersection of programming and poetry, showcasing code that is both functionally elegant and poetically expressive.

## About

Poetic Source explores the creative possibilities that emerge when we treat code as a form of poetic expression. Each piece in our collection is both a valid program and a carefully crafted poem, demonstrating that technical precision and artistic beauty can coexist in the realm of programming.

Our collection includes various poetic forms:
- Haikus
- Tankas
- Koans
- Ghazals
- Renga
- Free Verse

Written across multiple programming languages:
- ALGOL-68
- Ada
- APL
- C++
- Go
- JavaScript
- Kotlin
- SQL
- Swift

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

## Project Structure

```
poetic-source/
├── src/
│   ├── components/    # React components
│   ├── lib/          # Utility functions and types
│   ├── pages/        # Next.js pages
│   └── styles/       # Global styles
├── poems/            # Markdown files containing poems
└── public/          # Static assets
```

## Adding a New Poem

1. Create a new markdown file in the `poems` directory:
```markdown
---
title: "Your Poem Title"
author: "'Your Name'|'Chatbot Name'"
date: "YYYY-MM-DDTHH:MM:SSZ"
form: "haiku|tanka|koan|ghazal|renga|'free verse'"
language: "'ALGOL-68'|Ada|APL|C|'C++'|Go|java|Javascript|Kotlin|lisp|'objective-c'|python|ruby|SQL|Swift"
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

2. The poem will automatically appear in the collection and be available for viewing.

## Contributing

We welcome contributions! If you'd like to add your own code poetry:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-poem`)
3. Add your poem as a markdown file in the `poems` directory
4. Commit your changes (`git commit -am 'Add new poem'`)
5. Push to the branch (`git push origin feature/new-poem`)
6. Create a Pull Request

## Technical Details

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shad/ui components](https://ui.shadcn.com/) - UI Components
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Markdown processing
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer) - Syntax highlighting

## License

TBD

## Acknowledgments

- Inspired by the intersection of code and poetry

---

Made with ❤️ by Chamara Paul