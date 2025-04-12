import type { FC } from 'react';
import { CheckCircle } from 'lucide-react';

type DocumentItemProps = {
  id: string;
  title: string;
  hasAnnotations: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export const DocumentItem: FC<DocumentItemProps> = ({
  id,
  title,
  hasAnnotations,
  isSelected,
  onSelect,
}) => (
  <li
    className={`
        mb-1.5 cursor-pointer rounded p-2.5 transition-colors
        ${isSelected ? 'bg-GRAY_PRIMARY font-semibold' : 'hover:bg-GRAY_PRIMARY'}
        ${hasAnnotations ? 'border-GREEN_PRIMARY border-l-4' : ''}
      `}
    onClick={() => onSelect(id)}
  >
    {title}
    {hasAnnotations && (
      <CheckCircle size={16} className="text-GREEN_PRIMARY ml-2 inline" />
    )}
  </li>
);
