import React, { useState } from 'react';
import { CustomTypeDefinition, FieldDefinition } from '@/types/common';

type CustomTypeModalProps = {
  customType: CustomTypeDefinition;
  initialValues?: Record<string, any>;
  onSave: (values: Record<string, any>) => void;
  onCancel: () => void;
}

export const CustomTypeModal: React.FC<CustomTypeModalProps> = ({
  customType,
  initialValues = {},
  onSave,
  onCancel,
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (fieldId: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error when field is filled
    if (value) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    // Validate that at least one field has a value
    const hasValue = Object.values(values).some((value) => 
      value !== undefined && value !== null && value !== ''
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
      // Dropdown field
      return (
        <div className="mb-4" key={id}>
          <label className="block font-medium mb-1" htmlFor={id}>
            {name}
          </label>
          <select
            id={id}
            className="w-full p-2 border border-gray-300 rounded"
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
      // Integer field
      return (
        <div className="mb-4" key={id}>
          <label className="block font-medium mb-1" htmlFor={id}>
            {name}
          </label>
          <input
            id={id}
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={values[id] || ''}
            onChange={(e) => handleChange(id, e.target.value ? parseInt(e.target.value) : '')}
          />
        </div>
      );
    } else {
      // String field
      return (
        <div className="mb-4" key={id}>
          <label className="block font-medium mb-1" htmlFor={id}>
            {name}
          </label>
          <input
            id={id}
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={values[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 max-w-[90%] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold">{customType["Type Label"]}</h3>
          <button 
            className="text-2xl text-gray-500 hover:text-gray-700"
            onClick={onCancel}
          >
            &times;
          </button>
        </div>
        
        <div className="p-4">
          {customType.Fields.map(renderField)}
          
          {errors.form && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {errors.form}
            </div>
          )}
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button 
            className="px-4 py-2 bg-gray-200 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
