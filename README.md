  # Poetic Source

  Poetic Source is a platform that celebrates the intersection of programming and poetry. Each piece in the collection strives to combine programming concepts and poetic form, demonstrating how technical precision and artistic beauty can complement each other.


  ## Features

  The collection showcases various poetic forms:
  - Ghazals: Rhyming couplets
  - Haikus: 5-7-5 syllables
  - Koans: Paradoxical puzzles
  - Rubaʿi: Rhyming quatrains
  - Tankas: 5-7-5-7-7 syllables
  - Free Verse

  Available in multiple programming languages:
  - Modern Synthesis: Swift, Go, JavaScript
  - Natural Flow: Python, Ruby, Kotlin
  - Structured Elegance: ALGOL 68, Ada, Java
  - Visual Expression: APL, Befunge
  - System Dialogues: C, C++, Objective-C
  - Symbolic Patterns: Lisp, SQL

  Each poem includes:
  - Composition notes explaining poetic structure and writing choices
  - Technical explanations of programming concepts
  - Philosophical insights exploring deeper connections

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
  │   ├── components/ 
  │   ├── hooks/ 
  │   ├── lib/         
  │   ├── pages/       
  │   └── styles/   
  ├── poems/   # Markdown files containing poems
  └── scripts/         
  ```

  ### Testing

  ```bash
  npm test    
  npm test:watch    # Run tests in watch mode
  ```

  ## Contributing

  ### Creative Exploration

  As a contributor to Poetic Source, you have the opportunity to explore the creative possibilities that emerge when we treat code as a poetic medium. 
  - Experiment with different programming languages, poetic forms, and computer science concepts
  - Use programming and syntax constraints to create meaning and beauty
  - Discover new ways to express ideas through code

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

  Pull requests will be checked for poem validation (`npm run validate-poems`) and poetic form adherence.

  ## Technical Details

  Built with:
  - [Next.js](https://nextjs.org/) - React framework with Typescript
  - [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Markdown processing and frontmatter parsing
  - [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer) - Syntax highlighting
  - [shad/ui components](https://ui.shadcn.com/) - UI Components
  - [Lucide React](https://lucide.dev/guide/packages/lucide-react) - Icons
  - [Tailwind CSS](https://tailwindcss.com/) - Styling
  - [Jest](https://jestjs.io/) - Testing framework
  - [Chalk](https://www.npmjs.com/package/chalk/v/4.1.0) - Terminal styling for scripts

  ## License

  TBD

  ## Acknowledgments

  - Inspired by two loves: code and poetry
  - Built with assistance from [Claude AI](https://www.anthropic.com) - AI collaboration in code poem generation and site development

  ---
  