import { KeyboardEventHandler, useRef, useState } from "react";
import "./Searchbar.css";
import type {Token} from './types.ts'
import { Chip } from "./Chip.tsx";


export const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentInput, setCurrentInput] = useState("");

  const [tokens, setTokens] = useState<Token[]>([
    { text: "foo:bar", field: "foo", operator: "=", value: "bar" },
    { text: "Stage:Contacted", field: "Stage", operator: "=", value: "Contacted" },
  ]);

  const tokenizeInput = (textContent: string) => {
    console.log(">>> textContent", textContent);
  };

  const onKeyDown = (event: KeyboardEventHandler<HTMLInputElement>) => {
    // console.log(event)
    tokenizeInput(event.currentTarget.value);
  };

  return (
    <div className="searchbar-container">
      <div className="search-box">
        <span className="search-icon">🔍</span>

        {tokens.map((token) => (
          <Chip key={token.text} token={token} />
        ))}

        <div className="search-content">

        </div>

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
      </div>
    </div>
  );
};
