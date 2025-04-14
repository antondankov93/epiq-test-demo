import type { FC } from 'react';
import { useRef, useEffect } from 'react';
import { FileText } from 'lucide-react';

import type { KnowledgeUnitSchema } from '@/types/common';

type KnowledgeUnitDropdownProps = {
  schemas: KnowledgeUnitSchema[];
  onSelect: (schemaId: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const KnowledgeUnitDropdown: FC<KnowledgeUnitDropdownProps> = ({
  schemas,
  onSelect,
  isOpen,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="bg-WHITE_PRIMARY border-GRAY_PRIMARY absolute left-0 right-0 top-full z-10 rounded-b border shadow-md"
    >
      {schemas.map((schema) => (
        <div
          key={schema['Frame ID']}
          className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
          onClick={() => onSelect(schema['Frame ID'])}
        >
          <FileText size={16} className="text-GRAY_PRIMARY/500" />
          {schema['Frame Label']}
        </div>
      ))}
    </div>
  );
};
