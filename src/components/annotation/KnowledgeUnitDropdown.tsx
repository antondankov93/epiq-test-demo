import {FC} from 'react';
import { FileText } from 'lucide-react';
import { KnowledgeUnitSchema } from '@/types/common';

type KnowledgeUnitDropdownProps = {
  schemas: KnowledgeUnitSchema[];
  onSelect: (schemaId: string) => void;
  isOpen: boolean;
}

export const KnowledgeUnitDropdown: FC<KnowledgeUnitDropdownProps> = ({
  schemas,
  onSelect,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b shadow-md z-10">
      {schemas.map((schema) => (
        <div
          key={schema["Frame ID"]}
          className="p-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
          onClick={() => onSelect(schema["Frame ID"])}
        >
          <FileText size={16} className="text-gray-500" />
          {schema["Frame Label"]}
        </div>
      ))}
    </div>
  );
};
