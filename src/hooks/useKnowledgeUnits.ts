import { useState } from 'react';
import { KnowledgeUnit, KnowledgeUnitSchema } from '@/types/common';

export const useKnowledgeUnits = (
  initialKnowledgeUnits: KnowledgeUnit[],
  schemas: KnowledgeUnitSchema[],
  onUpdateKnowledgeUnits: (knowledgeUnits: KnowledgeUnit[]) => void
) => {
  const [showKuDropdown, setShowKuDropdown] = useState(false);

  const addKnowledgeUnit = (schemaId: string) => {
    const schema = schemas.find((s) => s["Frame ID"] === schemaId);
    if (!schema) return;

    const newKU: KnowledgeUnit = {
      id: crypto.randomUUID(),
      schemaId,
      fields: [],
    };

    onUpdateKnowledgeUnits([...initialKnowledgeUnits, newKU]);
    setShowKuDropdown(false);
  };

  const updateKnowledgeUnit = (updatedKU: KnowledgeUnit) => {
    const updatedKUs = initialKnowledgeUnits.map((ku) =>
      ku.id === updatedKU.id ? updatedKU : ku
    );
    
    onUpdateKnowledgeUnits(updatedKUs);
  };

  const removeKnowledgeUnit = (kuId: string) => {
    const updatedKUs = initialKnowledgeUnits.filter((ku) => ku.id !== kuId);
    onUpdateKnowledgeUnits(updatedKUs);
  };

  return {
    showKuDropdown,
    setShowKuDropdown,
    addKnowledgeUnit,
    updateKnowledgeUnit,
    removeKnowledgeUnit
  };
};
