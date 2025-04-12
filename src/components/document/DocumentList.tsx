import type { FC } from 'react';

import { DocumentItem } from './DocumentItem';

import type { Document } from '@/types/common';

type DocumentListProps = {
  allDocuments: Document[];
  selectedDocumentId: string | null;
  onSelectDocument: (documentId: string) => void;
};

export const DocumentList: FC<DocumentListProps> = ({
  allDocuments,
  selectedDocumentId,
  onSelectDocument,
}) => {
  const sortedDocuments = [...allDocuments].sort((a, b) => {
    if (a.hasAnnotations && !b.hasAnnotations) return -1;
    if (!a.hasAnnotations && b.hasAnnotations) return 1;
    return 0;
  });

  return (
    <div className="border-GRAY_PRIMARY bg-GRAY_PRIMARY/20 h-full w-64 overflow-y-auto border-r p-4">
      <h2 className="border-GRAY_PRIMARY mb-4 border-b pb-2 text-xl font-bold">
        Documents
      </h2>
      <ul className="m-0 list-none p-0">
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
