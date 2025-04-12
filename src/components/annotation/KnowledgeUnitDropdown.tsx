import type { FC } from 'react';
import { FileText } from 'lucide-react';

import type { KnowledgeUnitSchema } from '@/types/common';

type KnowledgeUnitDropdownProps = {
  schemas: KnowledgeUnitSchema[];
  onSelect: (schemaId: string) => void;
  isOpen: boolean;
};

export const KnowledgeUnitDropdown: FC<KnowledgeUnitDropdownProps> = ({
  schemas,
  onSelect,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-WHITE_PRIMARY border-GRAY_PRIMARY absolute left-0 right-0 top-full z-10 rounded-b border shadow-md">
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
