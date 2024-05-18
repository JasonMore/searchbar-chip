import { KeyboardEvent, useRef, useState } from "react";
import "./Searchbar.css";
import type { Token } from "./types.ts";
import { Chip } from "./Chip.tsx";
import { tokenize } from "./tokenize.ts";

export const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

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

  const tokenizeInput = (textContent: string) => {
    setTokens(tokens.concat(tokenize(textContent, "string")));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      tokenizeInput(event.currentTarget.value);
      setInputVisible(false);
      event.preventDefault();
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
        <span className="search-icon">🔍</span>

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
      </div>
      output would be sent to the table filtering
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  );
};
