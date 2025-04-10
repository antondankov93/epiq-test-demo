import {FC} from 'react';
import { CheckCircle } from 'lucide-react';

type DocumentItemProps = {
  id: string;
  title: string;
  hasAnnotations: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const DocumentItem: FC<DocumentItemProps> = ({
  id,
  title,
  hasAnnotations,
  isSelected,
  onSelect,
}) => {
  return (
    <li
      className={`
        p-2.5 mb-1.5 rounded cursor-pointer transition-colors
        ${isSelected ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200'}
        ${hasAnnotations ? 'border-l-4 border-green-500' : ''}
      `}
      onClick={() => onSelect(id)}
    >
      {title}
      {hasAnnotations && (
        <CheckCircle size={16} className="ml-2 text-green-600 inline" />
      )}
    </li>
  );
};
