import { KeyboardEvent, useRef, useState } from "react";
import "./Searchbar.css";
import type { Token } from "./types.ts";
import { Chip } from "./Chip.tsx";

export const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  const [tokens, setTokens] = useState<Token[]>([
    { text: "foo:bar", field: "foo", operator: "equals", value: "bar" },
    {
      text: "Stage:Contacted",
      field: "Stage",
      operator: "equals",
      value: "Contacted",
    },
    {
      text: "foo",
      field: "",
      operator: "unknown",
      value: "",
    },
  ]);

  const tokenizeInput = (textContent: string) => {
    const match = textContent.match(/(\w+):(\w+)/gi);
    if (!match?.[0]) {
      setTokens(
        tokens.concat({
          text: textContent,
          field: "",
          operator: "unknown",
          value: "",
        }),
      );
      return;
    }

    setTokens(
      tokens.concat({
        text: textContent,
        field: match[1],
        operator: "equals",
        value: match[2],
      }),
    );
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
    </div>
  );
};
