import { useState } from 'react';
import { Highlight, KnowledgeUnit } from '@/types/common';
import { getFieldColor } from '../utils/colorUtils';

export const useHighlighting = (
  knowledgeUnits: KnowledgeUnit[],
  highlights: Highlight[],
  updateKnowledgeUnits: (updatedKUs: KnowledgeUnit[]) => void
) => {
  const [activeHighlightingField, setActiveHighlightingField] = useState<{ fieldId: string; kuId: string } | null>(null);
  const [activeHighlightIds, setActiveHighlightIds] = useState<string[]>([]);

  // Toggle highlighting mode for a field
  const toggleHighlighting = (fieldId: string, kuId: string) => {
    if (activeHighlightingField?.fieldId === fieldId && activeHighlightingField?.kuId === kuId) {
      // Turn off highlighting
      setActiveHighlightingField(null);
    } else {
      // Turn on highlighting for this field
      setActiveHighlightingField({ fieldId, kuId });

      // Set active highlights for this field
      const fieldHighlights = highlights.filter(
        (h) => h.fieldId === fieldId && h.kuId === kuId
      );
      setActiveHighlightIds(fieldHighlights.map((h) => h.id));
    }
  };

  // Handle text selection for highlighting
  const handleTextSelect = (selection: { text: string; startOffset: number; endOffset: number }) => {
    if (!activeHighlightingField) return;

    const { fieldId, kuId } = activeHighlightingField;

    // Create a new highlight
    const newHighlight: Highlight = {
      id: crypto.randomUUID(),
      fieldId,
      kuId,
      startOffset: selection.startOffset,
      endOffset: selection.endOffset,
      text: selection.text,
      color: getFieldColor(fieldId),
    };

    // Add the highlight to the knowledge unit
    const updatedKUs = knowledgeUnits.map((ku) => {
      if (ku.id === kuId) {
        const updatedFields = ku.fields.map((field) => {
          if (field.fieldId === fieldId) {
            return {
              ...field,
              highlights: [...field.highlights, newHighlight],
            };
          }
          return field;
        });

        // If the field doesn't exist yet, add it
        if (!updatedFields.some((f) => f.fieldId === fieldId)) {
          updatedFields.push({
            fieldId,
            value: '',
            highlights: [newHighlight],
          });
        }

        return {
          ...ku,
          fields: updatedFields,
        };
      }
      return ku;
    });

    updateKnowledgeUnits(updatedKUs);
    setActiveHighlightIds([...activeHighlightIds, newHighlight.id]);
  };

  // Handle highlight click
  const handleHighlightClick = (highlightId: string) => {
    const highlight = highlights.find((h) => h.id === highlightId);
    if (!highlight) return;

    // Set the active highlighting field
    setActiveHighlightingField({
      fieldId: highlight.fieldId,
      kuId: highlight.kuId,
    });

    // Set active highlights for this field
    const fieldHighlights = highlights.filter(
      (h) => h.fieldId === highlight.fieldId && h.kuId === highlight.kuId
    );
    setActiveHighlightIds(fieldHighlights.map((h) => h.id));
  };

  // Add a new highlight
  const addHighlight = (highlight: Omit<Highlight, 'id' | 'color'>) => {
    const newHighlight: Highlight = {
      ...highlight,
      id: crypto.randomUUID(),
      color: getFieldColor(highlight.fieldId),
    };

    // Add the highlight to the knowledge unit
    const updatedKUs = knowledgeUnits.map((ku) => {
      if (ku.id === highlight.kuId) {
        const updatedFields = ku.fields.map((field) => {
          if (field.fieldId === highlight.fieldId) {
            return {
              ...field,
              highlights: [...field.highlights, newHighlight],
            };
          }
          return field;
        });

        return {
          ...ku,
          fields: updatedFields,
        };
      }
      return ku;
    });

    updateKnowledgeUnits(updatedKUs);
  };

  return {
    activeHighlightingField,
    activeHighlightIds,
    getFieldColor,
    toggleHighlighting,
    handleTextSelect,
    handleHighlightClick,
    addHighlight
  };
};
