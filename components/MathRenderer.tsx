'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  asBlock?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  className = '',
  asBlock = false,
}) => {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    // Pattern to identify $$...$$, \[...\], and $...$
    // Group 1: $$...$$ or \[...\] (display mode)
    // Group 2: $...$ (inline mode)
    const regex = /\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]|\$([^\$\n]+?)\$/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    let keyIndex = 0;

    while ((match = regex.exec(content)) !== null) {
      // Add plain text before match
      if (match.index > lastIndex) {
        const textBefore = content.substring(lastIndex, match.index);
        parts.push(
          <span key={`text-${keyIndex++}`} className="whitespace-pre-wrap">
            {textBefore}
          </span>
        );
      }

      const displayMath = match[1] || match[2];
      const inlineMath = match[3];

      if (displayMath !== undefined) {
        try {
          const html = katex.renderToString(displayMath.trim(), {
            displayMode: true,
            throwOnError: false,
          });
          parts.push(
            <span
              key={`math-display-${keyIndex++}`}
              className="my-2 block overflow-x-auto text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          parts.push(
            <code key={`math-err-${keyIndex++}`} className="text-red-500 font-mono text-xs">
              {match[0]}
            </code>
          );
        }
      } else if (inlineMath !== undefined) {
        try {
          const html = katex.renderToString(inlineMath.trim(), {
            displayMode: false,
            throwOnError: false,
          });
          parts.push(
            <span
              key={`math-inline-${keyIndex++}`}
              className="inline-block px-0.5 align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          parts.push(
            <code key={`math-err-${keyIndex++}`} className="text-red-500 font-mono text-xs">
              ${inlineMath}$
            </code>
          );
        }
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining plain text
    if (lastIndex < content.length) {
      parts.push(
        <span key={`text-end-${keyIndex++}`} className="whitespace-pre-wrap">
          {content.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  }, [content]);

  return (
    <div className={`${asBlock ? 'block' : 'inline leading-relaxed'} ${className}`}>
      {renderedElements}
    </div>
  );
};
