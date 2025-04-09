import React from 'react';

type DocumentItemProps = {
  id: string;
  title: string;
  hasAnnotations: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({
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
        <span className="ml-1 text-green-600">✓</span>
      )}
    </li>
  );
};
