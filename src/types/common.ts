export type StringType = string;
export type IntegerType = 'Integer' | 'integer';
export type ArrayType = string[];

export type CustomTypeValue = Record<
  string,
  string | number | boolean | undefined
>;

export type FieldType = StringType | IntegerType | ArrayType | string;

export type FieldDefinition = {
  id: string;
  name: string;
  type: FieldType;
  required?: boolean;
  multiple?: boolean;
};

export type KnowledgeUnitSchema = {
  'Frame Label': string;
  'Frame ID': string;
  Fields: FieldDefinition[];
};

export type CustomTypeDefinition = {
  'type ID': string;
  'Type Label': string;
  Fields: FieldDefinition[];
};

export type Highlight = {
  id: string;
  fieldId: string;
  kuId: string;
  startOffset: number;
  endOffset: number;
  text: string;
  color: string;
};

export type FieldValueType =
  | string
  | number
  | boolean
  | undefined
  | CustomTypeValue;

export type FieldValue = {
  fieldId: string;
  value: FieldValueType;
  highlights: Highlight[];
};

export type KnowledgeUnit = {
  id: string;
  schemaId: string;
  fields: FieldValue[];
};

export type Document = {
  id: string;
  title: string;
  content: string;
  hasAnnotations: boolean;
  knowledgeUnits: KnowledgeUnit[];
};

export type CustomTypeModalField = {
  fieldId: string;
  customTypeId: string;
};

export type TextSelection = {
  text: string;
  startOffset: number;
  endOffset: number;
};

export type ActiveHighlightingField =
  | {
      fieldId: string;
      kuId: string;
    }
  | undefined;

export type HighlightData = Omit<Highlight, 'id' | 'color'>;
