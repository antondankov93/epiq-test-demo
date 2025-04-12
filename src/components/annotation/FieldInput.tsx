import type { FC } from 'react';
import { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

import { FieldHighlighter } from './FieldHighlighter';

import type {
  FieldDefinition,
  Highlight,
  FieldValueType,
} from '@/types/common';
import { dynamicLists } from '@/utils/mockData';

type FieldInputProps = {
  field: FieldDefinition;
  value: FieldValueType;
  highlights: Highlight[];
  isRequired: boolean;
  isOptional: boolean;
  fieldColor: string;
  isHighlightingActive: boolean;
  error?: string;
  onUpdateValue: (value: FieldValueType) => void;
  onRemoveField: () => void;
  onToggleHighlighting: (fieldId: string, kuId: string) => void;
  onClearHighlights: (fieldId: string, kuId: string) => void;
  kuId: string;
  onOpenCustomType?: (fieldId: string, customTypeId: string) => void;
};

export const FieldInput: FC<FieldInputProps> = ({
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

  const getFilteredOptions = (options: string[]): string[] => {
    const term = searchTerm.toLowerCase();
    if (!term) return options;

    return options.filter((option) => option.toLowerCase().includes(term));
  };

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

    if (
      Array.isArray(type) &&
      type.some((t) => typeof t === 'string' && t.startsWith('DYNAMIC_'))
    ) {
      const options = resolveDynamicListType(type);

      return (
        <div className="relative">
          <input
            type="text"
            className="border-GRAY_PRIMARY w-full rounded border p-2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder={(value as string) || `Search ${name}...`}
          />
          {isDropdownOpen && (
            <div className="bg-WHITE_PRIMARY border-GRAY_PRIMARY absolute left-0 right-0 top-full z-10 max-h-48 overflow-y-auto rounded-b border">
              {getFilteredOptions(options).map((option) => (
                <div
                  key={option}
                  className="cursor-pointer p-2 hover:bg-gray-100"
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

    if (Array.isArray(type)) {
      return (
        <select
          className="border-GRAY_PRIMARY w-full rounded border p-2"
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

    if (type === 'integer' || type === 'Integer') {
      return (
        <input
          type="number"
          className="border-GRAY_PRIMARY w-full rounded border p-2"
          value={(value as string) || ''}
          onChange={(e) =>
            onUpdateValue(e.target.value ? parseInt(e.target.value) : '')
          }
        />
      );
    }

    if (typeof type === 'string' && onOpenCustomType) {
      return (
        <div
          className="cursor-pointer"
          onClick={() => onOpenCustomType(id, type)}
        >
          {value ? (
            <div className="border-GRAY_PRIMARY bg-GRAY_PRIMARY/50 rounded border p-2">
              {typeof value === 'object'
                ? Object.entries(value)
                    .filter(([_, v]) => v)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(', ')
                : value}
            </div>
          ) : (
            <button className="border-GRAY_PRIMARY bg-GRAY_PRIMARY/50 w-full rounded border p-2 text-left">
              Set {name} Value
            </button>
          )}
        </div>
      );
    }

    return (
      <input
        type="text"
        className="border-GRAY_PRIMARY w-full rounded border p-2"
        value={value || ''}
        onChange={(e) => onUpdateValue(e.target.value)}
      />
    );
  };

  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between">
        <div className="font-medium">
          {field.name}{' '}
          {isRequired && <span className="text-RED_PRIMARY">*</span>}
        </div>
        <div className="flex items-center">
          <FieldHighlighter
            {...{
              kuId,
              highlights,
              onToggleHighlighting,
              onClearHighlights,
            }}
            fieldId={field.id}
            color={fieldColor}
            isActive={isHighlightingActive}
          />
          {isOptional && (
            <button
              type="button"
              className="text-RED_PRIMARY ml-2"
              onClick={onRemoveField}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div
        className={`${error ? 'rounded border border-red-300 bg-red-50 p-2' : ''}`}
      >
        {renderInputField()}

        {error && (
          <div className="text-RED_PRIMARY mt-2 flex items-center text-sm">
            <AlertTriangle size={16} className="mr-1 flex-shrink-0" />
            {error}
          </div>
        )}

        {isRequired && !value && !error && (
          <div className="text-AMBER_PRIMARY mt-1 flex items-center text-xs">
            <Info size={12} className="mr-1 flex-shrink-0" />
            This field is required
          </div>
        )}

        {value && highlights.length === 0 && !error && (
          <div className="text-AMBER_PRIMARY mt-1 flex items-center text-xs">
            <Info size={12} className="mr-1 flex-shrink-0" />
            Please highlight evidence for this field
          </div>
        )}
      </div>
    </div>
  );
};
