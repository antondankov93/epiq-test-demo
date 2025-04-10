import {FC, useState} from 'react';
import {Check, X, Highlighter} from 'lucide-react';
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
    <div className="flex gap-1 items-center">
      <button
        type="button"
        className={`
          w-6 h-6 border rounded flex items-center justify-center
          ${isActive ? 'border-black shadow-sm' : 'border-gray-300'}
          ${hasHighlights ? 'bg-opacity-100' : 'bg-opacity-20'}
          transition-all duration-200 hover:shadow-sm
        `}
        style={{
          backgroundColor: hasHighlights ? color : 'transparent',
          borderColor: hasHighlights ? color : '#ccc',
        }}
        onClick={() => onToggleHighlighting(fieldId, kuId)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={isActive ? 'Cancel highlighting mode' : 'Highlight evidence in document'}
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
          className="text-red-500 text-xs hover:text-red-700 transition-colors"
          onClick={() => onClearHighlights(fieldId, kuId)}
          title="Clear all highlights for this field"
          aria-label="Clear highlights"
        >
          <X size={14} />
        </button>
      )}

      {hasHighlights && (
        <span className="text-xs text-gray-500 ml-1">
          {highlights.length} {highlights.length === 1 ? 'highlight' : 'highlights'}
        </span>
      )}
    </div>
  );
};
