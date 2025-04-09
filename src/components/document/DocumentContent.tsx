import React, { useRef, useEffect, useState } from 'react';
import { Highlight } from '../../utils/types';
import { Paintbrush } from 'lucide-react';

type DocumentContentProps = {
  content: string;
  highlights: Highlight[];
  activeHighlightIds: string[];
  onHighlightClick: (highlightId: string) => void;
  onTextSelect: (selection: { text: string; startOffset: number; endOffset: number }) => void;
  isHighlightingActive: boolean;
}

export const DocumentContent: React.FC<DocumentContentProps> = ({
  content,
  highlights,
  activeHighlightIds,
  onHighlightClick,
  onTextSelect,
  isHighlightingActive,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Apply highlights to the document content
    const applyHighlights = () => {
      if (!contentRef.current) return;

      // Reset content
      contentRef.current.innerHTML = content;

      // Sort highlights by start offset in descending order to avoid position shifts
      const sortedHighlights = [...highlights].sort((a, b) => b.startOffset - a.startOffset);

      // Apply each highlight
      for (const highlight of sortedHighlights) {
        const contentHtml = contentRef.current.innerHTML;
        const before = contentHtml.substring(0, highlight.startOffset);
        const highlighted = contentHtml.substring(highlight.startOffset, highlight.endOffset);
        const after = contentHtml.substring(highlight.endOffset);

        const isActive = activeHighlightIds.includes(highlight.id);

        contentRef.current.innerHTML = `${before}<span
          class="highlight rounded ${isActive ? 'opacity-100' : 'opacity-30'} cursor-pointer transition-opacity"
          style="background-color: ${highlight.color};"
          data-highlight-id="${highlight.id}"
        >${highlighted}</span>${after}`;
      }

      // Add click event listeners to highlights
      const highlightElements = contentRef.current.querySelectorAll('.highlight');
      highlightElements.forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          const highlightId = (e.currentTarget as HTMLElement).getAttribute('data-highlight-id');
          if (highlightId) {
            onHighlightClick(highlightId);
          }
        });
      });
    };

    applyHighlights();
  }, [content, highlights, activeHighlightIds, onHighlightClick]);

  const handleMouseUp = () => {
    if (!isHighlightingActive) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const startOffset = getTextOffset(contentRef.current!, range.startContainer, range.startOffset);
    const endOffset = getTextOffset(contentRef.current!, range.endContainer, range.endOffset);

    if (startOffset >= 0 && endOffset > startOffset) {
      onTextSelect({
        text: selection.toString(),
        startOffset,
        endOffset,
      });
      selection.removeAllRanges();
    }
  };

  // Helper function to get text offset relative to the container
  const getTextOffset = (container: Node, node: Node, offset: number): number => {
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

  // Apply cursor style based on highlighting mode
  const cursorStyle = isHighlightingActive ? 'cursor-crosshair' : 'cursor-text';

  return (
    <div
      ref={contentRef}
      className={`whitespace-pre-wrap leading-relaxed font-mono ${cursorStyle} ${isHighlightingActive ? 'bg-gray-50' : ''}`}
      onMouseUp={handleMouseUp}
    >
      {content}
      {isHighlightingActive && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
          <Paintbrush size={16} />
          Highlighting Mode: Select text to highlight
        </div>
      )}
    </div>
  );
};
