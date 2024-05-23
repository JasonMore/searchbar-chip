export type FieldType = "unknown" | "string" | "date" | "number" | "boolean";

export type Field = {
  name: string;
  type: FieldType;
};

export type SearchOptions = {
  name: string;
  type?: FieldType;
  description?: string;
};

export type Token = {
  text?: string;
  field?: string;
  type?: FieldType;
  operator?: ":=" | ":-" | ":<" | ":>" | "unknown";
  value?: string;
};
