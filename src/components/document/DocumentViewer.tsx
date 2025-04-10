import {FC} from 'react';
import { Document, Highlight, TextSelection } from '@/types/common';
import { DocumentContent } from './DocumentContent';

type DocumentViewerProps = {
  selectedDocument: Document | null;
  highlights: Highlight[];
  activeHighlightIds: string[];
  onTextSelect: (selection: TextSelection) => void;
  onHighlightClick: (highlightId: string) => void;
  isHighlightingActive: boolean;
}

export const DocumentViewer: FC<DocumentViewerProps> = ({
  selectedDocument,
  highlights,
  activeHighlightIds,
  onTextSelect,
  onHighlightClick,
  isHighlightingActive,
}) => {
  return (
    <div className="flex-1 h-full overflow-y-auto p-5 bg-white relative">
      {selectedDocument ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{selectedDocument.title}</h2>
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
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Select a document from the list to view its content.</p>
        </div>
      )}
    </div>
  );
};
