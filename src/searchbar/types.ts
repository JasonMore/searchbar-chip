export type Token = {
  text: string;
  field: string;
  operator: "equals" | "unknown";
  value: string;
}