// src/lib/validation/utils.ts
import { ProgrammingLanguage } from '../types';

export interface PoeticLine {
  content: string;
  lineNumber: number;
  type: 'code' | 'comment' | 'string' | 'mixed';
}

interface LanguageConfig {
  singleLineComment: string[];
  multiLineComment?: {
    start: string;
    end: string;
  };
  stringDelimiters: string[];
}

const LANGUAGE_CONFIGS: Record<ProgrammingLanguage, LanguageConfig> = {
  python: {
    singleLineComment: ['#'],
    stringDelimiters: ['"', "'", '"""', "'''"]
  },
  javascript: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"', "'", '`']
  },
  ruby: {
    singleLineComment: ['#'],
    multiLineComment: {
      start: '=begin',
      end: '=end'
    },
    stringDelimiters: ['"', "'"]
  },
  ada: {
    singleLineComment: ['--'],
    stringDelimiters: ['"']
  },
  algol68: {
    singleLineComment: ['#', 'CO'],
    multiLineComment: {
      start: 'COMMENT',
      end: 'COMMENT'
    },
    stringDelimiters: ['"']
  },
  apl: {
    singleLineComment: ['⍝'],
    stringDelimiters: ["'"]
  },
  befunge: {
    singleLineComment: [';'],
    stringDelimiters: ['"']
  },
  c: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"']
  },
  cpp: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"']
  },
  go: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"', '`']
  },
  java: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"']
  },
  kotlin: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"', "'"]
  },
  lisp: {
    singleLineComment: [';'],
    multiLineComment: {
      start: '#|',
      end: '|#'
    },
    stringDelimiters: ['"']
  },
  objectivec: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"', '@"']
  },
  sql: {
    singleLineComment: ['--'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ["'"]
  },
  swift: {
    singleLineComment: ['//'],
    multiLineComment: {
      start: '/*',
      end: '*/'
    },
    stringDelimiters: ['"']
  }
};

/**
 * Extracts meaningful poetic lines from code, handling comments and strings
 * appropriately for each language
 */
export function extractPoeticLines(content: string, language: ProgrammingLanguage): PoeticLine[] {
  const config = LANGUAGE_CONFIGS[language];
  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const lines = content.split('\n');
  const poeticLines: PoeticLine[] = [];
  let inMultiLineComment = false;
  let multiLineCommentContent = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle multi-line comments
    if (config.multiLineComment) {
      if (line.includes(config.multiLineComment.start)) {
        inMultiLineComment = true;
        const contentAfterStart = line.split(config.multiLineComment.start)[1];
        if (contentAfterStart) {
          multiLineCommentContent += ' ' + contentAfterStart.trim();
        }
        continue;
      }

      if (line.includes(config.multiLineComment.end)) {
        inMultiLineComment = false;
        const contentBeforeEnd = line.split(config.multiLineComment.end)[0];
        if (contentBeforeEnd) {
          multiLineCommentContent += ' ' + contentBeforeEnd.trim();
        }
        if (multiLineCommentContent.trim()) {
          poeticLines.push({
            content: multiLineCommentContent.trim(),
            lineNumber: i + 1,
            type: 'comment'
          });
        }
        multiLineCommentContent = '';
        continue;
      }

      if (inMultiLineComment) {
        multiLineCommentContent += ' ' + line;
        continue;
      }
    }

    // Handle single-line comments
    let foundComment = false;
    for (const commentMarker of config.singleLineComment) {
      if (line.includes(commentMarker)) {
        const parts = line.split(commentMarker);
        const code = parts[0].trim();
        const comment = parts[1].trim();

        if (code && comment) {
          poeticLines.push({
            content: `${code} ${comment}`,
            lineNumber: i + 1,
            type: 'mixed'
          });
        } else if (comment) {
          poeticLines.push({
            content: comment,
            lineNumber: i + 1,
            type: 'comment'
          });
        }
        foundComment = true;
        break;
      }
    }
    if (foundComment) continue;

    // Handle strings
    let hasString = false;
    for (const delimiter of config.stringDelimiters) {
      const regex = new RegExp(`${delimiter}[^${delimiter}]*${delimiter}`);
      const match = line.match(regex);
      if (match) {
        const stringContent = match[0].slice(delimiter.length, -delimiter.length);
        if (stringContent.trim()) {
          poeticLines.push({
            content: stringContent,
            lineNumber: i + 1,
            type: 'string'
          });
          hasString = true;
        }
        break;
      }
    }
    if (hasString) continue;

    // Handle remaining code if it seems meaningful
    if (line.length > 1 && !line.match(/^[{}();,\[\]]+$/)) {
      poeticLines.push({
        content: line,
        lineNumber: i + 1,
        type: 'code'
      });
    }
  }

  return poeticLines;
}

/**
 * Helper function to clean a line of code/comment markers and common punctuation
 * while preserving meaningful content
 */
export function cleanLine(line: string): string {
  return line
    .replace(/^[#/;-]+/, '') // Remove comment markers
    .replace(/[{}();,\[\]]+$/, '') // Remove trailing punctuation
    .trim();
}