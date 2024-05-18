import { Token } from "./types";

export const tokenize = (textContent: string): Token => {
  const match = /(\w+):(\w+)/gi.exec(textContent);
  if (!match?.[0]) {
    return {
      text: textContent,
      field: "",
      type: "string",
      operator: "unknown",
      value: "",
    };
  }

  return {
    text: textContent,
    field: match[1],
    type: "unknown",
    operator: "equals",
    value: match[2],
  };
};
