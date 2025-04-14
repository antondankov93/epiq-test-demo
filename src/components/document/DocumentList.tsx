import type { FC } from 'react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { DocumentItem } from './DocumentItem';

import type { Document } from '@/types/common';

type DocumentListProps = {
  allDocuments: Document[];
  selectedDocumentId: string | null;
  onSelectDocument: (documentId: string) => void;
  isHighlightingActive: boolean;
};

export const DocumentList: FC<DocumentListProps> = ({
  allDocuments,
  selectedDocumentId,
  onSelectDocument,
  isHighlightingActive,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 15;
  const totalPages = Math.ceil(allDocuments.length / documentsPerPage);

  const sortedDocuments = [...allDocuments].sort((a, b) => {
    if (a.hasAnnotations && !b.hasAnnotations) return -1;
    if (!a.hasAnnotations && b.hasAnnotations) return 1;
    return 0;
  });

  const startIndex = (currentPage - 1) * documentsPerPage;
  const endIndex = startIndex + documentsPerPage;
  const currentDocuments = sortedDocuments.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (isHighlightingActive) return;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div
      className={`border-GRAY_PRIMARY bg-GRAY_PRIMARY/20 flex h-full w-64 flex-col overflow-hidden border-r`}
    >
      <div className="p-4">
        <h2 className="border-GRAY_PRIMARY mb-4 border-b pb-2 text-xl font-bold">
          Documents
        </h2>
        <p className="text-GRAY_SECONDARY mb-4 text-sm">
          Total: {allDocuments.length} documents
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <ul className="m-0 list-none p-0">
          {currentDocuments.map((document) => (
            <DocumentItem
              key={document.id}
              id={document.id}
              title={document.title}
              hasAnnotations={document.hasAnnotations}
              isSelected={document.id === selectedDocumentId}
              onSelect={onSelectDocument}
              isClickable={
                !isHighlightingActive || document.id === selectedDocumentId
              }
            />
          ))}
        </ul>
      </div>

      <div className="border-GRAY_PRIMARY flex items-center justify-between border-t p-4">
        <button
          className="text-GRAY_SECONDARY hover:text-GRAY_PRIMARY disabled:text-GRAY_SECONDARY/50 flex items-center hover:cursor-pointer disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isHighlightingActive}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-GRAY_SECONDARY text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="text-GRAY_SECONDARY hover:text-GRAY_PRIMARY disabled:text-GRAY_SECONDARY/50 flex items-center hover:cursor-pointer disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isHighlightingActive}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
