import { Maximize, X } from 'lucide-react';
import { Highlight, type Language, themes } from 'prism-react-renderer';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
  const isDesktop = useMediaQuery('(min-width: 768px)');

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

  const CodeContent = ({ isFullscreen = false }) => {
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
          <pre
            className={cn(
              'overflow-x-auto p-4 text-xs md:text-sm bg-[#011627] text-[#d6deeb]',
              !isFullscreen && 'rounded-lg'
            )}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                className="flex flex-row min-h-[1.25rem] md:min-h-[1.5rem] leading-5 md:leading-6"
              >
                {showLineNumbers && (
                  <span className="shrink-0 text-right pr-4 select-none opacity-50 text-sm">
                    {i + 1}
                  </span>
                )}
                <span className="min-w-fit">
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

    // Fallback to Prism highlighting
    return (
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={languageMap[language] || 'typescript'}
      >
        {({ className, style, tokens, getTokenProps }) => (
          <pre
            className={cn(
              className,
              'overflow-x-auto p-4 text-xs md:text-sm',
              !isFullscreen && 'rounded-lg'
            )}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="shrink-0 text-right pr-4 select-none opacity-50 text-sm">
                    {i + 1}
                  </span>
                )}
                <span className="min-w-fit">
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

  if (isDesktop) {
    return <CodeContent />;
  }

  return (
    <div className="relative group">
      <CodeContent />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 p-1 h-8 w-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-full"
          >
            <Maximize className="h-4 w-4 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 w-full h-[100dvh] bg-[#011627] overflow-hidden">
          <div className="absolute right-4 top-4 z-50">
            <DialogTrigger className="rounded-full p-2 bg-white/10 hover:bg-white/20">
              <X className="h-4 w-4 text-white" />
            </DialogTrigger>
          </div>
          <div className="h-full overflow-auto overscroll-y-contain">
            <CodeContent isFullscreen />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeBlock;
