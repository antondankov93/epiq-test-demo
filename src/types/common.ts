export type FieldType =
  | string 
  | string[] 
  | { [key: string]: any };

export type FieldDefinition = {
  id: string;
  name: string;
  type: FieldType;
  required?: boolean;
  multiple?: boolean;
}

export type KnowledgeUnitSchema = {
  "Frame Label": string;
  "Frame ID": string;
  "Fields": FieldDefinition[];
}

export type CustomTypeDefinition = {
  "type ID": string;
  "Type Label": string;
  "Fields": FieldDefinition[];
}

export type Highlight = {
  id: string;
  fieldId: string;
  kuId: string;
  startOffset: number;
  endOffset: number;
  text: string;
  color: string;
}

export type FieldValue = {
  fieldId: string;
  value: any;
  highlights: Highlight[];
}

export type KnowledgeUnit = {
  id: string;
  schemaId: string;
  fields: FieldValue[];
}

export type Document = {
  id: string;
  title: string;
  content: string;
  hasAnnotations: boolean;
  knowledgeUnits: KnowledgeUnit[];
}

export type CustomTypeModalField = {
  fieldId: string;
  customTypeId: string;
}
