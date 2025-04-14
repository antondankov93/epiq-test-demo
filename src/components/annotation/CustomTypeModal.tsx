import type { FC } from 'react';
import { useState } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';

import type {
  CustomTypeDefinition,
  FieldDefinition,
  CustomTypeValue,
} from '@/types/common';

type CustomTypeModalProps = {
  customType: CustomTypeDefinition;
  initialValues?: CustomTypeValue;
  onSave: (values: CustomTypeValue) => void;
  onCancel: () => void;
};

export const CustomTypeModal: FC<CustomTypeModalProps> = ({
  customType,
  initialValues = {},
  onSave,
  onCancel,
}) => {
  const [values, setValues] = useState<CustomTypeValue>(initialValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    fieldId: string,
    value: string | number | boolean | undefined
  ) => {
    setValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (value) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const hasValue = Object.values(values).some(
      (value) => value !== undefined && value !== null && value !== ''
    );

    if (!hasValue) {
      setErrors({
        form: 'At least one field must have a value',
      });
      return;
    }

    onSave(values);
  };

  const renderField = (field: FieldDefinition) => {
    const { id, name, type } = field;

    if (Array.isArray(type)) {
      return (
        <div className="mb-4" key={id}>
          <label className="mb-1 block font-medium" htmlFor={id}>
            {name}
          </label>
          <select
            id={id}
            className="border-GRAY_PRIMARY w-full rounded border p-2"
            value={values[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
          >
            <option value="">Select {name}</option>
            {type.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (type === 'Integer') {
      return (
        <div className="mb-4" key={id}>
          <label className="mb-1 block font-medium" htmlFor={id}>
            {name}
          </label>
          <input
            id={id}
            type="number"
            className="border-GRAY_PRIMARY w-full rounded border p-2"
            value={values[id] || ''}
            onChange={(e) =>
              handleChange(id, e.target.value ? parseInt(e.target.value) : '')
            }
          />
        </div>
      );
    } else {
      return (
        <div className="mb-4" key={id}>
          <label className="mb-1 block font-medium" htmlFor={id}>
            {name}
          </label>
          <input
            id={id}
            type="text"
            className="border-GRAY_PRIMARY w-full rounded border p-2"
            value={values[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-WHITE_PRIMARY max-h-[90vh] w-96 max-w-[90%] overflow-y-auto rounded-lg">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 className="text-lg font-bold">{customType['Type Label']}</h3>
          <button
            className="text-GRAY_PRIMARY/500 rounded-full p-1 hover:bg-gray-100 hover:text-gray-700"
            onClick={onCancel}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {customType.Fields.map(renderField)}

          {errors['form'] && (
            <div className="text-RED_PRIMARY flex items-center gap-2 rounded bg-red-50 p-2 text-sm">
              <AlertTriangle size={16} />
              {errors['form']}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-gray-200 p-4">
          <button
            className="hover:bg-GRAY_PRIMARY mr-2 flex items-center gap-1 rounded bg-gray-200 px-4 py-2 transition-colors"
            onClick={onCancel}
          >
            <X size={16} />
            Cancel
          </button>
          <button
            className="flex items-center gap-1 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
            onClick={handleSubmit}
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
