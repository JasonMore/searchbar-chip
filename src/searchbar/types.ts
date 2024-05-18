export type Token = {
  text: string;
  field: string;
  type: "unknown" | "string" | "date" | "number" | "boolean";
  operator: "unknown" | "equals" | "wildcard";
  value: string;
};
