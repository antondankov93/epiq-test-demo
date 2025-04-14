import type { FC } from 'react';
import { useRef, useEffect } from 'react';
import { Paintbrush } from 'lucide-react';

import type { Highlight, TextSelection } from '@/types/common';

type DocumentContentProps = {
  content: string;
  highlights: Highlight[];
  activeHighlightIds: string[];
  onHighlightClick: (highlightId: string) => void;
  onTextSelect: (selection: TextSelection) => void;
  isHighlightingActive: boolean;
};

export const DocumentContent: FC<DocumentContentProps> = ({
  content,
  highlights,
  activeHighlightIds,
  onHighlightClick,
  onTextSelect,
  isHighlightingActive,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyHighlights = () => {
      if (!contentRef.current) return;

      contentRef.current.innerHTML = content;

      const sortedHighlights = [...highlights].sort(
        (a, b) => b.startOffset - a.startOffset
      );

      for (const highlight of sortedHighlights) {
        const contentHtml = contentRef.current.innerHTML;
        const before = contentHtml.substring(0, highlight.startOffset);
        const highlighted = contentHtml.substring(
          highlight.startOffset,
          highlight.endOffset
        );
        const after = contentHtml.substring(highlight.endOffset);

        const isActive = activeHighlightIds.includes(highlight.id);

        contentRef.current.innerHTML = `${before}<span
          class="highlight rounded ${isActive ? 'opacity-100' : 'opacity-30'} cursor-pointer transition-opacity"
          style="background-color: ${highlight.color};"
          data-highlight-id="${highlight.id}"
        >${highlighted}</span>${after}`;
      }

      const highlightElements =
        contentRef.current.querySelectorAll('.highlight');
      highlightElements.forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          const highlightId = (e.currentTarget as HTMLElement).getAttribute(
            'data-highlight-id'
          );
          if (highlightId) {
            onHighlightClick(highlightId);
          }
        });
      });
    };

    applyHighlights();
  }, [content, highlights, activeHighlightIds]);

  const getTextOffset = (
    container: Node,
    node: Node,
    offset: number
  ): number => {
    if (!container.contains(node)) return -1;

    let totalOffset = 0;
    const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let currentNode = walk.nextNode();

    while (currentNode) {
      if (currentNode === node) {
        return totalOffset + offset;
      }
      totalOffset += currentNode.textContent?.length || 0;
      currentNode = walk.nextNode();
    }

    return -1;
  };

  const handleMouseUp = () => {
    if (!isHighlightingActive) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const startOffset = getTextOffset(
      contentRef.current!,
      range.startContainer,
      range.startOffset
    );
    const endOffset = getTextOffset(
      contentRef.current!,
      range.endContainer,
      range.endOffset
    );

    if (startOffset >= 0 && endOffset > startOffset) {
      onTextSelect({
        text: selection.toString(),
        startOffset,
        endOffset,
      });
      selection.removeAllRanges();
    }
  };

  const cursorStyle = isHighlightingActive ? 'cursor-crosshair' : 'cursor-text';

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={`whitespace-pre-wrap font-mono leading-relaxed ${cursorStyle} ${isHighlightingActive ? 'bg-GRAY_PRIMARY/50' : ''}`}
        onMouseUp={handleMouseUp}
      >
        {content}
      </div>

      {isHighlightingActive && (
        <div className="absolute mt-4 flex h-12 w-full items-center gap-2 rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800 shadow-md">
          <Paintbrush size={16} />
          Highlighting Mode: Select text to highlight
        </div>
      )}
    </div>
  );
};
