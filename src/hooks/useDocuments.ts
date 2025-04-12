import { useState } from 'react';

import type { Document, KnowledgeUnit, Highlight } from '@/types/common';

export const useDocuments = (initialDocuments: Document[]) => {
  const [allDocuments, setAllDocuments] =
    useState<Document[]>(initialDocuments);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [knowledgeUnits, setKnowledgeUnits] = useState<KnowledgeUnit[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const selectDocument = (documentId: string) => {
    setSelectedDocumentId(documentId);
    const doc = allDocuments.find((d) => d.id === documentId) || null;
    setSelectedDocument(doc);
    setKnowledgeUnits(doc?.knowledgeUnits || []);

    const docHighlights: Highlight[] = [];
    doc?.knowledgeUnits.forEach((ku) => {
      ku.fields.forEach((field) => {
        docHighlights.push(...field.highlights);
      });
    });
    setHighlights(docHighlights);
  };

  const updateKnowledgeUnits = (updatedKUs: KnowledgeUnit[]) => {
    setKnowledgeUnits(updatedKUs);

    if (selectedDocumentId) {
      const updatedDocuments = allDocuments.map((doc) => {
        if (doc.id === selectedDocumentId) {
          return {
            ...doc,
            knowledgeUnits: updatedKUs,
            hasAnnotations: updatedKUs.length > 0,
          };
        }
        return doc;
      });

      setAllDocuments(updatedDocuments);

      const updatedDoc =
        updatedDocuments.find((d) => d.id === selectedDocumentId) || null;
      setSelectedDocument(updatedDoc);

      const docHighlights: Highlight[] = [];
      updatedKUs.forEach((ku) => {
        ku.fields.forEach((field) => {
          docHighlights.push(...field.highlights);
        });
      });
      setHighlights(docHighlights);
    }
  };

  return {
    allDocuments,
    selectedDocumentId,
    selectedDocument,
    knowledgeUnits,
    highlights,
    selectDocument,
    updateKnowledgeUnits,
  };
};
