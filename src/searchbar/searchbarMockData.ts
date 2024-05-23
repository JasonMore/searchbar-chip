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
  Stage: {
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
  PatientsReferred: {
    name: "PatientsReferred",
    type: "number",
    operators: [
      { name: ":-", description: "Not - do not include" },
      { name: ":<", description: "Less Than - values below or earlier than" },
      { name: ":>", description: "Greater Than - values above or later than" },
      { name: ":=", description: "Equals - exactly this value" },
    ],
  },
  "Date of Last Interaction": {
    name: "Date of Last Interaction",
    type: "date",
    operators: [
      { name: ":-", description: "Not - do not include" },
      { name: ":<", description: "Less Than - values below or earlier than" },
      { name: ":>", description: "Greater Than - values above or later than" },
      { name: ":=", description: "Equals - exactly this value" },
    ],
  },
  Name: {
    name: "Name",
    type: "string",
    operators: [
      { name: ":=", description: "Equals - exactly this value" },
      { name: ":-", description: "Not - do not include" },
    ],
  },
};
