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
    operators: [":=", ":-"],
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
    operators: [":=", ":-", ":>", ":="],
  },
  "date of last interaction": {
    name: "Date of Last Interaction",
    type: "date",
    operators: [":=", ":-", ":>", ":="],
  },
  name: { name: "Name", type: "string", operators: [":=", ":-"] },
};
