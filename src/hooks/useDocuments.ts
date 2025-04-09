import { useState } from 'react';
import { Document, KnowledgeUnit, Highlight } from '../types';

export const useDocuments = (initialDocuments: Document[]) => {
  const [allDocuments, setAllDocuments] = useState<Document[]>(initialDocuments);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [knowledgeUnits, setKnowledgeUnits] = useState<KnowledgeUnit[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  // Select a document
  const selectDocument = (documentId: string) => {
    setSelectedDocumentId(documentId);
    const doc = allDocuments.find((d) => d.id === documentId) || null;
    setSelectedDocument(doc);
    setKnowledgeUnits(doc?.knowledgeUnits || []);
    
    // Collect all highlights from the document's knowledge units
    const docHighlights: Highlight[] = [];
    doc?.knowledgeUnits.forEach((ku) => {
      ku.fields.forEach((field) => {
        docHighlights.push(...field.highlights);
      });
    });
    setHighlights(docHighlights);
  };

  // Update knowledge units for the selected document
  const updateKnowledgeUnits = (updatedKUs: KnowledgeUnit[]) => {
    setKnowledgeUnits(updatedKUs);
    
    // Update the document with the new knowledge units
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
      
      // Update selected document
      const updatedDoc = updatedDocuments.find((d) => d.id === selectedDocumentId) || null;
      setSelectedDocument(updatedDoc);
      
      // Update highlights
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
    updateKnowledgeUnits
  };
};
