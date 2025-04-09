// Basic field types
export type FieldType = 
  | string 
  | string[] 
  | { [key: string]: any };

// Field definition in a Knowledge Unit schema
export type FieldDefinition = {
  id: string;
  name: string;
  type: FieldType;
  required?: boolean;
  multiple?: boolean;
}

// Knowledge Unit schema
export type KnowledgeUnitSchema = {
  "Frame Label": string;
  "Frame ID": string;
  "Fields": FieldDefinition[];
}

// Custom type definition
export type CustomTypeDefinition = {
  "type ID": string;
  "Type Label": string;
  "Fields": FieldDefinition[];
}

// Highlight information
export type Highlight = {
  id: string;
  fieldId: string;
  kuId: string;
  startOffset: number;
  endOffset: number;
  text: string;
  color: string;
}

// Field value in a Knowledge Unit instance
export type FieldValue = {
  fieldId: string;
  value: any;
  highlights: Highlight[];
}

// Knowledge Unit instance
export type KnowledgeUnit = {
  id: string;
  schemaId: string;
  fields: FieldValue[];
}

// Document with annotations
export type Document = {
  id: string;
  title: string;
  content: string;
  hasAnnotations: boolean;
  knowledgeUnits: KnowledgeUnit[];
}
