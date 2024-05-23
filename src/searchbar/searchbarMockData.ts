import { Token } from "./types.ts";

export const mockSetTokens: Token[] = [
  {
    text: "Stage:Contacted",
    field: "Stage",
    type: "string",
    operator: ":",
    value: "Contacted",
  },
  {
    text: "Name:-Jason",
    field: "Name",
    type: "string",
    operator: ":",
    value: "Jason*",
  },
];
export const mockFields = {
  Stage: { type: "string" },
  PatientsReferred: { type: "number" },
  "Date of Last Interaction": { type: "date" },
  Name: { type: "string" },
};
export const mockFieldOptions = [
  { name: "Stage", type: "string" },
  { name: "PatientsReferred", type: "number" },
  { name: "Date of Last Interaction", type: "date" },
  { name: "Name", type: "string" },
];
export const mockValueOptions = [
  { name: "Lead", type: "string" },
  { name: "Demo", type: "string" },
  { name: "Negotiating", type: "string" },
  { name: "Closed-Won", type: "string" },
  { name: "Closed-Lost", type: "string" },
];
