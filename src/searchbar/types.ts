export type FieldType = "unknown" | "string" | "date" | "number" | "boolean";

export type Token = {
  text: string;
  field: string;
  type: FieldType
  operator: "unknown" | "equals" | "wildcard";
  value: string;
};
