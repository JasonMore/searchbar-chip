import { useState } from "react";
import viteLogo from "/vite.svg";
import searchIcon from "/search.svg";
import "./Searchbar.css";

export const Searchbar = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [tokens, setTokens] = useState([]);

  const handleInputChange = (event: Event) => {
    setCurrentInput(event.target.value);
  };

  const tokenizeInput = () => {
    if (currentInput.trim()) {
      setTokens([...tokens, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      tokenizeInput();
    }
  };

  return (
    <div className="searchbar-container">
      <img src={viteLogo} className="vite-logo" alt="Vite logo" />

      <div className="search-box">
        <img src={searchIcon} className="search-icon" alt="Vite logo" />

        <input
          className="search-input"
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Filter"
          autoComplete="off"
        />
      </div>
      <div>
        {tokens.map((token, index) => (
          <span key={index} className="token">
            {token}
          </span>
        ))}
      </div>
    </div>
  );
};
