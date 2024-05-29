import { FieldType, Token } from "./types";

export const parseTextContent = (textContent: string = ""): Partial<Token> => {
  const match = /(?<field>[\w\s]+)?(?<operator>:[-<>=])?(?<value>\w\d\s+)?/gi.exec(
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
