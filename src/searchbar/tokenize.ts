import { FieldType, Token } from "./types";

export const parseTextContent = (textContent: string): Partial<Token> => {
  const match = /(?<field>\w+)?(?<operator>:[-<>]?)?(?<value>\w+)?/gi.exec(
    textContent,
  );

  return {
    text: textContent,
    field: match?.groups?.field,
    // TODO: check type with type predicate https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
    operator: match?.groups?.operator,
    value: match?.groups?.value,
  };
};

export const tokenize = (textContent: string, fieldType: FieldType): Token => {
  const parsed = parseTextContent(textContent);

  return {
    text: textContent,
    field: parsed.field ?? "--missing field--",
    type: fieldType,
    operator: parsed.operator ?? "unknown",
    value: parsed.value ?? "--missing value--",
  };
};
