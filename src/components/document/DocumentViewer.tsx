import type { FC } from 'react';

import { DocumentContent } from './DocumentContent';

import type { Document, Highlight, TextSelection } from '@/types/common';

type DocumentViewerProps = {
  selectedDocument: Document | null;
  highlights: Highlight[];
  activeHighlightIds: string[];
  onTextSelect: (selection: TextSelection) => void;
  onHighlightClick: (highlightId: string) => void;
  isHighlightingActive: boolean;
};

export const DocumentViewer: FC<DocumentViewerProps> = ({
  selectedDocument,
  highlights,
  activeHighlightIds,
  onTextSelect,
  onHighlightClick,
  isHighlightingActive,
}) => (
  <div className="bg-WHITE_PRIMARY relative h-full flex-1 overflow-y-auto p-5">
    {selectedDocument ? (
      <>
        <h2 className="mb-4 text-2xl font-bold">{selectedDocument.title}</h2>
        <DocumentContent
          {...{
            highlights,
            activeHighlightIds,
            onTextSelect,
            onHighlightClick,
            isHighlightingActive,
          }}
          content={selectedDocument.content}
        />
      </>
    ) : (
      <div className="text-GRAY_PRIMARY/500 flex h-full items-center justify-center">
        <p>Select a document from the list to view its content.</p>
      </div>
    )}
  </div>
);
