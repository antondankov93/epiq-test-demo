import type { FC } from 'react';
import { useState } from 'react';
import { Check, X, Highlighter } from 'lucide-react';

import type { Highlight } from '@/types/common';

type FieldHighlighterProps = {
  fieldId: string;
  kuId: string;
  highlights: Highlight[];
  color: string;
  isActive: boolean;
  onToggleHighlighting: (fieldId: string, kuId: string) => void;
  onClearHighlights: (fieldId: string, kuId: string) => void;
};

export const FieldHighlighter: FC<FieldHighlighterProps> = ({
  fieldId,
  kuId,
  highlights,
  color,
  isActive,
  onToggleHighlighting,
  onClearHighlights,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasHighlights = highlights.length > 0;

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={`
          flex h-6 w-6 items-center justify-center rounded border
          ${isActive ? 'border-black shadow-sm' : 'border-GRAY_PRIMARY'}
          ${hasHighlights ? 'bg-opacity-100' : 'bg-opacity-20'}
          transition-all duration-200 hover:cursor-pointer hover:shadow-sm
        `}
        style={{
          backgroundColor: hasHighlights ? color : 'transparent',
          borderColor: hasHighlights ? color : '#ccc',
        }}
        onClick={() => onToggleHighlighting(fieldId, kuId)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={
          isActive
            ? 'Cancel highlighting mode'
            : 'Highlight evidence in document'
        }
        aria-pressed={isActive}
        aria-label="Toggle highlighting mode"
      >
        {isActive ? (
          <Check size={14} className="text-black" />
        ) : (
          <Highlighter size={14} className="text-gray-700" />
        )}
      </button>

      {hasHighlights && (
        <button
          type="button"
          className="text-RED_PRIMARY hover:text-RED_PRIMARY text-xs transition-colors hover:cursor-pointer"
          onClick={() => onClearHighlights(fieldId, kuId)}
          title="Clear all highlights for this field"
          aria-label="Clear highlights"
        >
          <X size={14} />
        </button>
      )}

      {hasHighlights && (
        <span className="text-GRAY_SECONDARY ml-1 text-xs">
          {highlights.length}{' '}
          {highlights.length === 1 ? 'highlight' : 'highlights'}
        </span>
      )}
    </div>
  );
};
