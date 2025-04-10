import {FC} from 'react';
import {
  KnowledgeUnitSchema,
  KnowledgeUnit as KnowledgeUnitType,
  ActiveHighlightingField,
  HighlightData
} from '@/types/common';
import { KnowledgeUnit } from './KnowledgeUnit';
import { KnowledgeUnitDropdown } from './KnowledgeUnitDropdown';
import { useKnowledgeUnits } from '@/hooks';
import { getFieldColor } from '@/utils/colorUtils';
import { PlusCircle } from 'lucide-react';

type AnnotationPanelProps = {
  documentId: string | null;
  knowledgeUnitSchemas: KnowledgeUnitSchema[];
  knowledgeUnits: KnowledgeUnitType[];
  onUpdateKnowledgeUnits: (knowledgeUnits: KnowledgeUnitType[]) => void;
  activeHighlightingField: ActiveHighlightingField;
  onToggleHighlighting: (fieldId: string, kuId: string) => void;
  onAddHighlight: (highlight: HighlightData) => void;
}

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
    removeKnowledgeUnit
  } = useKnowledgeUnits(knowledgeUnits, knowledgeUnitSchemas, onUpdateKnowledgeUnits);

  return (
    <div className="w-96 h-full overflow-y-auto border-l border-gray-300 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-300">Knowledge Units</h2>

      {documentId ? (
        <>
          <div className="relative mb-4">
            <button
              className="w-full py-2 px-4 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setShowKuDropdown(!showKuDropdown)}
            >
              <PlusCircle size={18} />
              Add Knowledge Unit
            </button>

            <KnowledgeUnitDropdown
              schemas={knowledgeUnitSchemas}
              onSelect={addKnowledgeUnit}
              isOpen={showKuDropdown}
            />
          </div>

          {knowledgeUnits.length === 0 ? (
            <div className="text-gray-500 text-center p-4">
              <p>No Knowledge Units added yet. Click "Add Knowledge Unit" to get started.</p>
            </div>
          ) : (
            <div>
              {knowledgeUnits.map((ku) => {
                const schema = knowledgeUnitSchemas.find((s) => s["Frame ID"] === ku.schemaId);
                if (!schema) return null;

                return (
                  <KnowledgeUnit
                    {...{
                      schema,
                      activeHighlightingField,
                      onAddHighlight,
                      getFieldColor,
                    }}
                    key={ku.id}
                    knowledgeUnit={ku}
                    onUpdate={updateKnowledgeUnit}
                    onRemove={removeKnowledgeUnit}
                    onToggleHighlighting={onToggleHighlighting}
                  />
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-500 text-center p-4">
          <p>Select a document to add Knowledge Units.</p>
        </div>
      )}
    </div>
  );
};
