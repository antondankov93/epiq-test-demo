import { useState } from 'react';

import { getFieldColor } from '../utils/colorUtils';

import type {
  Highlight,
  KnowledgeUnit,
  TextSelection,
  ActiveHighlightingField,
  HighlightData,
} from '@/types/common';

export const useHighlighting = (
  knowledgeUnits: KnowledgeUnit[],
  highlights: Highlight[],
  updateKnowledgeUnits: (updatedKUs: KnowledgeUnit[]) => void
) => {
  const [activeHighlightingField, setActiveHighlightingField] =
    useState<ActiveHighlightingField>(undefined);
  const [activeHighlightIds, setActiveHighlightIds] = useState<string[]>([]);

  const toggleHighlighting = (fieldId: string, kuId: string) => {
    if (!fieldId || !kuId) {
      setActiveHighlightingField(undefined);
      return;
    }

    if (
      activeHighlightingField?.fieldId === fieldId &&
      activeHighlightingField?.kuId === kuId
    ) {
      setActiveHighlightingField(undefined);
    } else {
      setActiveHighlightingField({ fieldId, kuId });
      const fieldHighlights = highlights.filter(
        (h) => h.fieldId === fieldId && h.kuId === kuId
      );
      setActiveHighlightIds(fieldHighlights.map((h) => h.id));
    }
  };

  const handleTextSelect = (selection: TextSelection) => {
    if (!activeHighlightingField) return;

    const { fieldId, kuId } = activeHighlightingField;

    const newHighlight: Highlight = {
      fieldId,
      kuId,
      id: crypto.randomUUID(),
      startOffset: selection.startOffset,
      endOffset: selection.endOffset,
      text: selection.text,
      color: getFieldColor(fieldId),
    };

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

  const handleHighlightClick = (highlightId: string) => {
    const highlight = highlights.find((h) => h.id === highlightId);
    if (!highlight) return;

    setActiveHighlightingField({
      fieldId: highlight.fieldId,
      kuId: highlight.kuId,
    });

    const fieldHighlights = highlights.filter(
      (h) => h.fieldId === highlight.fieldId && h.kuId === highlight.kuId
    );
    setActiveHighlightIds(fieldHighlights.map((h) => h.id));
  };

  const addHighlight = (highlight: HighlightData) => {
    const newHighlight: Highlight = {
      ...highlight,
      id: crypto.randomUUID(),
      color: getFieldColor(highlight.fieldId),
    };

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
    addHighlight,
  };
};
