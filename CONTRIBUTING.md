# Contributing to Poetic Source

## Creative Exploration

As a contributor to Poetic Source, you have the opportunity to explore the creative possibilities that emerge when we treat code as a poetic medium: 
- Experiment with different programming languages, poetic forms, and computer science concepts
- Use programming and syntax constraints to create meaning and beauty
- Discover new ways to express ideas through code

## Adding a New Poem

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-poem`)

3. Create a new markdown file in the appropriate language directory under `poems/` using this frontmatter template:
```markdown
---
id: "kebab-case-unique-id"
title: "Your Poem Title"
author: "Your Name"
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

5. Validate your poem (`npm run validate-poems`). This will check:
  - Required frontmatter fields
  - Valid field formats (dates, IDs, tags)
  - Directory structure
  - Language and form validity

6. Commit your changes (`git commit -am 'Add new poem'`)
7. Push to the branch (`git push origin feature/new-poem`)
8. Create a Pull Request

## Contribution Tips
- Run validation before submitting to ensure your poem meets the requirements
- Consider using language and form constraints to enhance both the code and poetic aspects

## Terms of Submission
Pull requests will be checked for poem validation and poetic form adherence. 

By submitting a poem, you:
- Agree to license it under CC BY-SA 4.0 while maintaining your copyright (see [LICENSE-POEMS](LICENSE-POEMS))
- Accept the project's terms of use (see [TERMS.md](TERMS.md))
- Grant the project permission to display and share your work

## Questions or Need Help?
Open an issue for general questions or email me at chamara@poeticsource.com.
