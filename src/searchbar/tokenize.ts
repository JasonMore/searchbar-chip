import { FieldType, Token } from "./types";

const operatorMap = {
  "-": "negate",
  "<": "lessThan",
  ">": "moreThan",
  "": "equals",
};

export const tokenize = (textContent: string, fieldType: FieldType): Token => {
  const match = /(?<field>\w+):(?<operator>[-<>]?)(?<value>\w+)/gi.exec(
    textContent,
  );
  if (!match) {
    return {
      text: textContent,
      field: "",
      type: fieldType,
      operator: "unknown",
      value: "",
    };
  }

  // TODO: check type with type predicate https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
  const operator = operatorMap[match.groups?.operator ?? ""];

  return {
    text: textContent,
    field: match.groups?.field ?? "--missing field--",
    type: fieldType,
    operator,
    value: match.groups?.value ?? "--missing value",
  };
};
