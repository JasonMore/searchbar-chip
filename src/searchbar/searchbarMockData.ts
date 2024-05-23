import { Token } from "./types.ts";

export const mockSetTokens: Token[] = [
  {
    text: "Stage:Contacted",
    field: "Stage",
    type: "string",
    operator: ":=",
    value: "Contacted",
  },
  {
    text: "Name:-Jason",
    field: "Name",
    type: "string",
    operator: ":=",
    value: "Jason*",
  },
];
export const mockFields = {
  stage: {
    name: "Stage",
    type: "string",
    operators: [
      { name: ":=", description: "Equals - exactly this value" },
      { name: ":-", description: "Not - do not include" },
    ],
    values: [
      { name: "Lead", type: "string" },
      { name: "Demo", type: "string" },
      { name: "Negotiating", type: "string" },
      { name: "Closed-Won", type: "string" },
      { name: "Closed-Lost", type: "string" },
    ],
  },
  patientsreferred: {
    name: "PatientsReferred",
    type: "number",
    operators: [
      { name: ":=", description: "Equals - exactly this value" },
      { name: ":-", description: "Not - do not include" },
      { name: ":<", description: "Less Than - values below" },
      { name: ":>", description: "Greater Than - values higher" },
    ],
  },
  "date of last interaction": {
    name: "Date of Last Interaction",
    type: "date",
    operators: [
      { name: ":=", description: "Equals - exactly this Date" },
      { name: ":-", description: "Not - do not include" },
      { name: ":<", description: "Less Than - Dates before" },
      { name: ":>", description: "Greater Than - Dates Fater" },
    ],
  },
  name: {
    name: "Name",
    type: "string",
    operators: [
      { name: ":=", description: "Equals - exactly this value" },
      { name: ":-", description: "Not - do not include" },
    ],
  },
};
