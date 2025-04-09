import React from 'react';
import { Highlight } from '@/types/common';

type FieldHighlighterProps = {
  fieldId: string;
  kuId: string;
  highlights: Highlight[];
  color: string;
  isActive: boolean;
  onToggleHighlighting: (fieldId: string, kuId: string) => void;
  onClearHighlights: (fieldId: string, kuId: string) => void;
}

export const FieldHighlighter: React.FC<FieldHighlighterProps> = ({
  fieldId,
  kuId,
  highlights,
  color,
  isActive,
  onToggleHighlighting,
  onClearHighlights,
}) => {
  const hasHighlights = highlights.length > 0;

  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={`
          w-6 h-6 border rounded
          ${isActive ? 'border-black' : 'border-gray-300'}
          transition-colors
        `}
        style={{
          backgroundColor: hasHighlights ? color : 'transparent',
          borderColor: color,
        }}
        onClick={() => onToggleHighlighting(fieldId, kuId)}
        title={isActive ? 'Cancel highlighting' : 'Highlight evidence in document'}
      >
        <span role="img" aria-label="Highlight" className="text-xs">
          🖌️
        </span>
      </button>
      {hasHighlights && (
        <button
          type="button"
          className="text-red-500 text-xs"
          onClick={() => onClearHighlights(fieldId, kuId)}
          title="Clear highlights"
        >
          <span role="img" aria-label="Clear">
            ❌
          </span>
        </button>
      )}
    </div>
  );
};
