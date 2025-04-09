import React, { useState } from 'react';
import { FieldDefinition, Highlight } from '../../utils/types';
import { FieldHighlighter } from './FieldHighlighter';
import { dynamicLists } from '../../utils/mockData';
import { AlertTriangle, Info } from 'lucide-react';

type FieldInputProps = {
  field: FieldDefinition;
  value: any;
  highlights: Highlight[];
  isRequired: boolean;
  isOptional: boolean;
  fieldColor: string;
  isHighlightingActive: boolean;
  error?: string;
  onUpdateValue: (value: any) => void;
  onRemoveField: () => void;
  onToggleHighlighting: (fieldId: string, kuId: string) => void;
  onClearHighlights: (fieldId: string, kuId: string) => void;
  kuId: string;
  onOpenCustomType?: () => void;
}

export const FieldInput: React.FC<FieldInputProps> = ({
  field,
  value,
  highlights,
  isRequired,
  isOptional,
  fieldColor,
  isHighlightingActive,
  error,
  onUpdateValue,
  onRemoveField,
  onToggleHighlighting,
  onClearHighlights,
  kuId,
  onOpenCustomType,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter dynamic list options based on search term
  const getFilteredOptions = (options: string[]): string[] => {
    const term = searchTerm.toLowerCase();
    if (!term) return options;

    return options.filter((option) =>
      option.toLowerCase().includes(term)
    );
  };

  // Resolve dynamic list type to actual options
  const resolveDynamicListType = (type: string | string[]): string[] => {
    if (!Array.isArray(type)) return [];

    const options: string[] = [];

    type.forEach((item) => {
      if (typeof item === 'string') {
        if (item.startsWith('DYNAMIC_') && dynamicLists[item]) {
          options.push(...dynamicLists[item]);
        } else {
          options.push(item);
        }
      }
    });

    return options;
  };

  const renderInputField = () => {
    const { id, name, type } = field;

    // Dropdown field with dynamic lists
    if (Array.isArray(type) && type.some(t => typeof t === 'string' && t.startsWith('DYNAMIC_'))) {
      const options = resolveDynamicListType(type);

      return (
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder={value || `Search ${name}...`}
          />
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-b z-10">
              {getFilteredOptions(options).map((option) => (
                <div
                  key={option}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    onUpdateValue(option);
                    setIsDropdownOpen(false);
                    setSearchTerm('');
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular dropdown for non-dynamic lists
    if (Array.isArray(type)) {
      return (
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={value || ''}
          onChange={(e) => onUpdateValue(e.target.value)}
        >
          <option value="">Select {name}</option>
          {type.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    // Integer field
    if (type === 'integer' || type === 'Integer') {
      return (
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={value || ''}
          onChange={(e) => onUpdateValue(e.target.value ? parseInt(e.target.value) : '')}
        />
      );
    }

    // Custom type field
    if (typeof type === 'string' && onOpenCustomType) {
      return (
        <div
          className="cursor-pointer"
          onClick={onOpenCustomType}
        >
          {value ? (
            <div className="p-2 border border-gray-300 rounded bg-gray-50">
              {typeof value === 'object' ?
                Object.entries(value)
                  .filter(([_, v]) => v)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(', ') :
                value
              }
            </div>
          ) : (
            <button className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-left">
              Set {name} Value
            </button>
          )}
        </div>
      );
    }

    // Default: string field
    return (
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        value={value || ''}
        onChange={(e) => onUpdateValue(e.target.value)}
      />
    );
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="font-medium">
          {field.name} {isRequired && <span className="text-red-500">*</span>}
        </div>
        <div className="flex items-center">
          <FieldHighlighter
            fieldId={field.id}
            kuId={kuId}
            highlights={highlights}
            color={fieldColor}
            isActive={isHighlightingActive}
            onToggleHighlighting={onToggleHighlighting}
            onClearHighlights={onClearHighlights}
          />
          {isOptional && (
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={onRemoveField}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={`${error ? 'border-red-300 border rounded p-2 bg-red-50' : ''}`}>
        {renderInputField()}

        {error && (
          <div className="flex items-center text-red-600 text-sm mt-2">
            <AlertTriangle size={16} className="mr-1 flex-shrink-0" />
            {error}
          </div>
        )}

        {isRequired && !value && !error && (
          <div className="flex items-center text-amber-600 text-xs mt-1">
            <Info size={12} className="mr-1 flex-shrink-0" />
            This field is required
          </div>
        )}

        {value && highlights.length === 0 && !error && (
          <div className="flex items-center text-amber-600 text-xs mt-1">
            <Info size={12} className="mr-1 flex-shrink-0" />
            Please highlight evidence for this field
          </div>
        )}
      </div>
    </div>
  );
};
