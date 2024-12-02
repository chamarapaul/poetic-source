// components/poems/display/CodeBlock.tsx
import { Highlight, type Language, themes } from 'prism-react-renderer';
import React from 'react';
import {
  adaTokenize,
  algol68Tokenize,
  aplTokenize,
  befungeTokenize,
  lispTokenize,
  objectiveCTokenize,
  rubyTokenize,
} from '@/lib/syntax/tokenizers';
import { Token } from '@/lib/syntax/tokenizers';
import { DEFAULT_CLASSES } from '@/lib/syntax/tokenizers/base';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = true,
}) => {
  // Map languages to their best-fit Prism language for fallback
  const languageMap: { [key: string]: Language } = {
    ada: 'pascal',
    algol68: 'plaintext',
    apl: 'apl',
    befunge: 'plaintext',
    lisp: 'plaintext',
    objectivec: 'objectivec',
    c: 'c',
    cpp: 'cpp',
    go: 'go',
    java: 'java',
    javascript: 'javascript',
    kotlin: 'kotlin',
    python: 'python',
    ruby: 'ruby',
    sql: 'sql',
    swift: 'swift',
  };

  // Determine if we should use custom highlighting
  const tokenizers: { [key: string]: (code: string) => Token[][] } = {
    ada: adaTokenize,
    algol68: algol68Tokenize,
    apl: aplTokenize,
    befunge: befungeTokenize,
    lisp: lispTokenize,
    objectivec: objectiveCTokenize,
    ruby: rubyTokenize,
  };

  // Use custom highlighting only when necessary
  const customTokenizer = tokenizers[language];
  if (customTokenizer) {
    const tokens = customTokenizer(code);

    // Only render custom highlighting if we got tokens
    if (tokens.length > 0) {
      return (
        <pre className="overflow-x-auto p-4 rounded-lg bg-[#011627] text-[#d6deeb]">
          {tokens.map((line, i) => (
            <div
              key={i}
              className="flex flex-row min-h-[1.25rem] md:min-h-[1.5rem] 
                 leading-5 md:leading-6"
            >
              {showLineNumbers && (
                <span className="table-cell text-right pr-4 select-none opacity-50 text-sm">
                  {i + 1}
                </span>
              )}
              <span className="table-cell">
                {line.map((token, j) => (
                  <span
                    key={j}
                    className={
                      token.className ?? DEFAULT_CLASSES[token.type] ?? ''
                    }
                  >
                    {token.content}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      );
    }
  }

  // Get base language for Prism
  const prismLanguage = languageMap[language] || 'typescript';

  return (
    <Highlight
      theme={themes.nightOwl}
      code={code.trim()}
      language={prismLanguage}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre
          className={`${className} overflow-x-auto p-4 rounded-lg`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} className="table-row">
              {showLineNumbers && (
                <span className="table-cell text-right pr-4 select-none opacity-50 text-sm">
                  {i + 1}
                </span>
              )}
              <span className="table-cell">
                {line.map((token, j) => {
                  const tokenProps = getTokenProps({ token });
                  return <span key={j} {...tokenProps} />;
                })}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
