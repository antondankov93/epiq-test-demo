import type { FC } from 'react';
import { PlusCircle } from 'lucide-react';

import { KnowledgeUnit } from './KnowledgeUnit';
import { KnowledgeUnitDropdown } from './KnowledgeUnitDropdown';

import type {
  KnowledgeUnitSchema,
  KnowledgeUnit as KnowledgeUnitType,
  ActiveHighlightingField,
  HighlightData,
} from '@/types/common';
import { useKnowledgeUnits } from '@/hooks';
import { getFieldColor } from '@/utils/colorUtils';

type AnnotationPanelProps = {
  documentId: string | undefined;
  knowledgeUnitSchemas: KnowledgeUnitSchema[];
  knowledgeUnits: KnowledgeUnitType[];
  onUpdateKnowledgeUnits: (knowledgeUnits: KnowledgeUnitType[]) => void;
  activeHighlightingField: ActiveHighlightingField;
  onToggleHighlighting: (fieldId: string, kuId: string) => void;
  onAddHighlight: (highlight: HighlightData) => void;
};

export const AnnotationPanel: FC<AnnotationPanelProps> = ({
  documentId,
  knowledgeUnitSchemas,
  knowledgeUnits,
  onUpdateKnowledgeUnits,
  activeHighlightingField,
  onToggleHighlighting,
  onAddHighlight,
}) => {
  const {
    showKuDropdown,
    setShowKuDropdown,
    addKnowledgeUnit,
    updateKnowledgeUnit,
    removeKnowledgeUnit,
  } = useKnowledgeUnits(
    knowledgeUnits,
    knowledgeUnitSchemas,
    onUpdateKnowledgeUnits
  );

  return (
    <div className="border-GRAY_PRIMARY h-full w-96 overflow-y-auto border-l bg-gray-100 p-4">
      <h2 className="border-GRAY_PRIMARY mb-4 border-b pb-2 text-xl font-bold">
        Knowledge Units
      </h2>

      {documentId ? (
        <>
          <div className="relative mb-4">
            <button
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-green-500 px-4 py-2 font-bold text-white transition-colors hover:bg-green-600"
              onClick={() => setShowKuDropdown(!showKuDropdown)}
            >
              <PlusCircle size={18} />
              Add Knowledge Unit
            </button>

            <KnowledgeUnitDropdown
              schemas={knowledgeUnitSchemas}
              onSelect={addKnowledgeUnit}
              isOpen={showKuDropdown}
              onClose={() => setShowKuDropdown(false)}
            />
          </div>

          {knowledgeUnits.length === 0 ? (
            <div className="text-GRAY_PRIMARY/500 p-4 text-center">
              <p>
                No Knowledge Units added yet. Click "Add Knowledge Unit" to get
                started.
              </p>
            </div>
          ) : (
            <div>
              {knowledgeUnits.map((ku) => {
                const schema = knowledgeUnitSchemas.find(
                  (s) => s['Frame ID'] === ku.schemaId
                );
                if (!schema) return null;

                return (
                  <KnowledgeUnit
                    {...{
                      schema,
                      activeHighlightingField,
                      onAddHighlight,
                      getFieldColor,
                      onToggleHighlighting,
                    }}
                    key={ku.id}
                    knowledgeUnit={ku}
                    onUpdate={updateKnowledgeUnit}
                    onRemove={removeKnowledgeUnit}
                  />
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="text-GRAY_PRIMARY/500 p-4 text-center">
          <p>Select a document to add Knowledge Units.</p>
        </div>
      )}
    </div>
  );
};
