import React from 'react';
import { Document } from '@/types/common';
import { DocumentItem } from './DocumentItem';

type DocumentListProps = {
  documents: Document[];
  selectedDocumentId: string | null;
  onSelectDocument: (documentId: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  selectedDocumentId,
  onSelectDocument,
}) => {
  // Sort documents - those with annotations come first
  const sortedDocuments = [...documents].sort((a, b) => {
    if (a.hasAnnotations && !b.hasAnnotations) return -1;
    if (!a.hasAnnotations && b.hasAnnotations) return 1;
    return 0;
  });

  return (
    <div className="w-64 h-full overflow-y-auto border-r border-gray-300 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">Documents</h2>
      <ul className="list-none p-0 m-0">
        {sortedDocuments.map((document) => (
          <DocumentItem
            key={document.id}
            id={document.id}
            title={document.title}
            hasAnnotations={document.hasAnnotations}
            isSelected={document.id === selectedDocumentId}
            onSelect={onSelectDocument}
          />
        ))}
      </ul>
    </div>
  );
};
