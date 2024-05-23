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
    operators: [":=", ":-"],
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
    operators: [":=", ":-", ":>", ":="],
  },
  "Date of Last Interaction": {
    name: "Date of Last Interaction",
    type: "date",
    operators: [":=", ":-", ":>", ":="],
  },
  Name: { name: "Name", type: "string", operators: [":=", ":-"] },
};
