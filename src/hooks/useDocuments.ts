import { useState } from 'react';

import type { Document, KnowledgeUnit, Highlight } from '@/types/common';

export const useDocuments = (initialDocuments: Document[]) => {
  const [allDocuments, setAllDocuments] =
    useState<Document[]>(initialDocuments);
  const [selectedDocument, setSelectedDocument] = useState<
    Document | undefined
  >(undefined);
  const [knowledgeUnits, setKnowledgeUnits] = useState<KnowledgeUnit[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const onSelectDocument = (documentId: string) => {
    const doc = allDocuments.find((d) => d.id === documentId) || undefined;
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

    if (selectedDocument) {
      const updatedDocuments = allDocuments.map((doc) => {
        if (doc.id === selectedDocument.id) {
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
        updatedDocuments.find((d) => d.id === selectedDocument.id) || undefined;
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
    selectedDocument,
    knowledgeUnits,
    highlights,
    onSelectDocument,
    updateKnowledgeUnits,
  };
};
