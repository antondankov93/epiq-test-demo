import {FC, useState} from 'react';
import { Trash2, AlertTriangle, Plus } from 'lucide-react';
import {
  KnowledgeUnitSchema,
  KnowledgeUnit as KnowledgeUnitType,
  FieldDefinition,
  Highlight,
  FieldValue,
  ActiveHighlightingField,
  HighlightData,
  CustomTypeModalField,
  FieldValueType,
  CustomTypeValue
} from '@/types/common';
import { FieldInput } from './FieldInput';
import { CustomTypeModal } from './CustomTypeModal';
import { customTypes } from '@/utils/mockData';

type KnowledgeUnitProps = {
  schema: KnowledgeUnitSchema;
  knowledgeUnit: KnowledgeUnitType;
  onUpdate: (updatedKU: KnowledgeUnitType) => void;
  onRemove: (kuId: string) => void;
  onToggleHighlighting: (fieldId: string, kuId: string) => void;
  activeHighlightingField: ActiveHighlightingField;
  onAddHighlight: (highlight: HighlightData) => void;
  getFieldColor: (fieldId: string) => string;
}

export const KnowledgeUnit: FC<KnowledgeUnitProps> = ({
  schema,
  knowledgeUnit,
  onUpdate,
  onRemove,
  onToggleHighlighting,
  activeHighlightingField,
  getFieldColor,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showingOptionalFields, setShowingOptionalFields] = useState<string[]>([]);
  const [customTypeModalField, setCustomTypeModalField] = useState<CustomTypeModalField | null>(null);

  const getFieldValue = (fieldId: string): FieldValue | undefined => {
    return knowledgeUnit.fields.find((field) => field.fieldId === fieldId);
  };

  const getFieldHighlights = (fieldId: string): Highlight[] => {
    return getFieldValue(fieldId)?.highlights || [];
  };

  const updateFieldValue = (fieldId: string, value: FieldValueType) => {
    const existingFieldIndex = knowledgeUnit.fields.findIndex(
      (field) => field.fieldId === fieldId
    );

    const updatedFields = [...knowledgeUnit.fields];

    if (existingFieldIndex >= 0) {
      updatedFields[existingFieldIndex] = {
        ...updatedFields[existingFieldIndex],
        value,
      };
    } else {
      updatedFields.push({
        fieldId,
        value,
        highlights: [],
      });
    }

    onUpdate({
      ...knowledgeUnit,
      fields: updatedFields,
    });

    if (value) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const clearHighlights = (fieldId: string) => {
    const existingFieldIndex = knowledgeUnit.fields.findIndex(
      (field) => field.fieldId === fieldId
    );

    if (existingFieldIndex >= 0) {
      const updatedFields = [...knowledgeUnit.fields];
      updatedFields[existingFieldIndex] = {
        ...updatedFields[existingFieldIndex],
        highlights: [],
      };

      onUpdate({
        ...knowledgeUnit,
        fields: updatedFields,
      });
    }
  };

  const addOptionalField = (fieldId: string) => {
    setShowingOptionalFields((prev) => [...prev, fieldId]);
  };

  const removeOptionalField = (fieldId: string) => {
    setShowingOptionalFields((prev) => prev.filter((id) => id !== fieldId));
    const updatedFields = knowledgeUnit.fields.filter(
      (field) => field.fieldId !== fieldId
    );

    onUpdate({
      ...knowledgeUnit,
      fields: updatedFields,
    });
  };

  const handleCustomTypeSave = (values: CustomTypeValue) => {
    if (!customTypeModalField) return;

    updateFieldValue(customTypeModalField.fieldId, values);
    setCustomTypeModalField(null);
  };

  const getAvailableOptionalFields = (): FieldDefinition[] => {
    return schema.Fields.filter(
      (field) =>
        !field.required &&
        !showingOptionalFields.includes(field.id)
    );
  };

  const isCustomType = (type: string | string[]): boolean => {
    if (Array.isArray(type)) {
      return false;
    }

    return customTypes.some((ct) => ct["type ID"] === type);
  };

  const getCustomTypeDefinition = (typeId: string) => {
    return customTypes.find((ct) => ct["type ID"] === typeId);
  };

  const handleOpenCustomType = (fieldId: string, customTypeId: string) => {
    setCustomTypeModalField({ fieldId, customTypeId });
  };

  const renderField = (field: FieldDefinition) => {
    const { id, type, required } = field;
    const fieldValue = getFieldValue(id);
    const value = fieldValue?.value || '';
    const highlights = getFieldHighlights(id);
    const isHighlightingActive = activeHighlightingField?.fieldId === id &&
                                activeHighlightingField?.kuId === knowledgeUnit.id;
    const fieldColor = getFieldColor(id);
    const isOptional = !required;

    if (isOptional && !showingOptionalFields.includes(id)) {
      return null;
    }

    if (isCustomType(type)) {
      return (
        <FieldInput
          {...{
            field,
            value,
            highlights,
            isOptional,
            fieldColor,
            isHighlightingActive,
            onToggleHighlighting
          }}
          key={id}
          kuId={knowledgeUnit.id}
          isRequired={!!required}
          error={errors[id]}
          onUpdateValue={(val) => updateFieldValue(id, val)}
          onRemoveField={() => removeOptionalField(id)}
          onClearHighlights={clearHighlights}
          onOpenCustomType={handleOpenCustomType}
        />
      );
    }

    return (
      <FieldInput
        {...{
          field,
          value,
          highlights,
          isOptional,
          fieldColor,
          isHighlightingActive,
          onToggleHighlighting
        }}
        key={id}
        kuId={knowledgeUnit.id}
        isRequired={!!required}
        error={errors[id]}
        onUpdateValue={(val) => updateFieldValue(id, val)}
        onRemoveField={() => removeOptionalField(id)}
        onClearHighlights={clearHighlights}
      />
    );
  };

  return (
    <div className="mb-4 rounded bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="text-lg font-bold">{schema['Frame Label']}</div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 border-none bg-transparent text-red-500"
            onClick={() => onRemove(knowledgeUnit.id)}
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">
          <p className="mb-1 flex items-center gap-1 font-bold">
            <AlertTriangle size={16} />
            Please fix the following errors:
          </p>
          <ul className="list-disc pl-5">
            {Object.entries(errors).map(([fieldId, error]) => {
              const fieldDef = schema.Fields.find((f) => f.id === fieldId);
              return (
                <li key={fieldId}>
                  {fieldDef ? fieldDef.name : fieldId}: {error}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="ku-fields">{schema.Fields.map(renderField)}</div>

      {getAvailableOptionalFields().length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            disabled={!!activeHighlightingField}
            className={`flex items-center gap-1 rounded border border-green-500 px-3 py-1 text-sm text-green-600 hover:bg-green-50 ${activeHighlightingField ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => {
              const availableFields = getAvailableOptionalFields();
              if (availableFields.length === 1) {
                addOptionalField(availableFields[0].id);
              } else {
                // TODO: Show dropdown to select field
                addOptionalField(availableFields[0].id);
              }
            }}
          >
            <Plus size={14} />
            Add Field
          </button>
        </div>
      )}

      {customTypeModalField && (
        <CustomTypeModal
          customType={
            getCustomTypeDefinition(customTypeModalField.customTypeId)!
          }
          initialValues={
            getFieldValue(customTypeModalField.fieldId)?.value || {}
          }
          onSave={handleCustomTypeSave}
          onCancel={() => setCustomTypeModalField(null)}
        />
      )}
    </div>
  );
};
