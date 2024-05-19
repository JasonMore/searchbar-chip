import { KeyboardEvent, useRef, useState } from "react";
import "./Searchbar.css";
import type { Field, Token } from "./types.ts";
import { Chip } from "./Chip.tsx";
import { tokenize } from "./tokenize.ts";
import { SearchBarOptions } from "./SearchBarOptions.tsx";

export const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<null | number>(
    null,
  );

  const [tokens, setTokens] = useState<Token[]>([
    // mock tokens
    {
      text: "Stage:Contacted",
      field: "Stage",
      type: "string",
      operator: "equals",
      value: "Contacted",
    },
    {
      text: "Name:Jason*",
      field: "Name",
      type: "string",
      operator: "wildcard",
      value: "Jason*",
    },
    {
      text: "foo",
      field: "",
      type: "unknown",
      operator: "unknown",
      value: "",
    },
  ]);

  const [fields, setFields] = useState<Field[]>([
    { name: "Stage", type: "string" },
    { name: "PatientsReferred", type: "number" },
    { name: "Date of Last Interaction", type: "date" },
  ]);

  const tokenizeInput = (textContent: string) => {
    setTokens(tokens.concat(tokenize(textContent, "string")));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      tokenizeInput(event.currentTarget.value);
      setInputVisible(false);
      event.preventDefault();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (
        selectedFieldIndex === null ||
        selectedFieldIndex === fields.length - 1 // end of list
      ) {
        return setSelectedFieldIndex(0);
      }

      setSelectedFieldIndex(selectedFieldIndex + 1);
    }
  };

  const showInput = () => {
    if (inputVisible) return;
    setInputVisible(true);
    setCurrentInput("");

    // I can't remember why this needs a setTimeout to work. Rendering order?
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  return (
    <div className="searchbar-container" onClick={showInput}>
      <div className="search-box">
        <span className="search-icon">
          🔍{fields.length} {selectedFieldIndex ?? "x"}
        </span>

        {tokens.map((token) => (
          <Chip key={token.text} token={token} />
        ))}

        <div className="search-content"></div>

        {inputVisible && (
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            value={currentInput}
            onChange={(event) => setCurrentInput(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder=""
            autoComplete="off"
          />
        )}
        {inputVisible && (
          <SearchBarOptions
            fields={fields}
            selectedFieldIndex={selectedFieldIndex}
          />
        )}
      </div>
      output would be sent to the table filtering
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  );
};
