import {FC} from 'react';
import { Document, Highlight } from '@/types/common';
import { DocumentContent } from './DocumentContent';

type DocumentViewerProps = {
  document: Document | null;
  highlights: Highlight[];
  activeHighlightIds: string[];
  onTextSelect: (selection: { text: string; startOffset: number; endOffset: number }) => void;
  onHighlightClick: (highlightId: string) => void;
  isHighlightingActive: boolean;
}

export const DocumentViewer: FC<DocumentViewerProps> = ({
  document,
  highlights,
  activeHighlightIds,
  onTextSelect,
  onHighlightClick,
  isHighlightingActive,
}) => {
  return (
    <div className="flex-1 h-full overflow-y-auto p-5 bg-white relative">
      {document ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{document.title}</h2>
          <DocumentContent
            content={document.content}
            highlights={highlights}
            activeHighlightIds={activeHighlightIds}
            onTextSelect={onTextSelect}
            onHighlightClick={onHighlightClick}
            isHighlightingActive={isHighlightingActive}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Select a document from the list to view its content.</p>
        </div>
      )}
    </div>
  );
};
