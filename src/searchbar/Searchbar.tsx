import { KeyboardEvent, MouseEventHandler, useRef, useState } from "react";
import "./Searchbar.css";
import { Field, SearchOptions, Token } from "./types.ts";
import { Chip } from "./Chip.tsx";
import { parseTextContent, tokenize } from "./tokenize.ts";
import { SearchBarOptions } from "./SearchBarOptions.tsx";

const mockSetTokens: Token[] = [
  {
    text: "Stage:Contacted",
    field: "Stage",
    type: "string",
    operator: ":",
    value: "Contacted",
  },
  {
    text: "Name:-Jason",
    field: "Name",
    type: "string",
    operator: ":",
    value: "Jason*",
  },
  {
    text: "foo",
    field: "",
    type: "unknown",
    operator: "unknown",
    value: "",
  },
];

const mockFields = {
  Stage: { type: "string" },
  PatientsReferred: { type: "number" },
  "Date of Last Interaction": { type: "date" },
};

const mockFieldOptions = [
  { name: "Stage", type: "string" },
  { name: "PatientsReferred", type: "number" },
  { name: "Date of Last Interaction", type: "date" },
];

const operators = [
  { name: ":-", description: "Not - do not include" },
  { name: ":<", description: "Less Than - values below or earlier than" },
  { name: ":>", description: "Greater Than - values above or later than" },
  { name: ":", description: "Equals - exactly this value" },
];

const mockValueOptions = [
  { name: "Lead", type: "string" },
  { name: "Demo", type: "string" },
  { name: "Negotiating", type: "string" },
  { name: "Closed-Won", type: "string" },
  { name: "Closed-Lost", type: "string" },
];

export const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<null | number>(
    null,
  );

  const [selectingOption, setSelectingOption] = useState<
    null | "field" | "operator" | "value"
  >(null);

  const [tokens, setTokens] = useState<Token[]>(mockSetTokens);

  // TODO: Populated by parsing table data
  const [fields, setFields] = useState<SearchOptions[]>(mockFieldOptions);
  const [values, setValues] = useState<SearchOptions[]>(mockValueOptions);

  const tokenizeInput = (textContent: string) => {
    setTokens(tokens.concat(tokenize(textContent, "string")));
  };

  // the current list of options to show in the dropdown
  const options = { field: fields, operator: operators, value: values }[
    selectingOption
  ];

  const closeOptions = () => {
    setSelectedFieldIndex(null);
    setSelectingOption(null);
    setCurrentInput("");
  };

  const resetOptions = () => {
    setSelectedFieldIndex(null);
    setSelectingOption("field");
    setCurrentInput("");
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    let textContent = event.currentTarget.value;
    const partialToken = parseTextContent(textContent);

    if (event.key === "Enter") {
      event.preventDefault();

      // replace field or value
      if (selectedFieldIndex !== null) {
        if (selectingOption === "field") {
          setSelectedFieldIndex(null);
          setSelectingOption("operator");
          setCurrentInput(`${fields[selectedFieldIndex].name}`);
          return;
        }

        if (selectingOption === "operator") {
          setSelectedFieldIndex(null);
          setSelectingOption("value");
          setCurrentInput(
            `${partialToken.field}${operators[selectedFieldIndex].name}`,
          );
          return;
        }

        if (selectingOption === "value") {
          // no return, as if selecting final value, assume they also want to immediately tokenize
          textContent = `${partialToken.field}${partialToken.operator}${values[selectedFieldIndex].name}`;
        }
      }

      // dropdown not active, user intends to set value
      tokenizeInput(textContent);
      closeOptions();
    }

    const endOfList = options?.length - 1;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (selectedFieldIndex === null || selectedFieldIndex === endOfList) {
        return setSelectedFieldIndex(0);
      }

      setSelectedFieldIndex(selectedFieldIndex + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (selectedFieldIndex === null || selectedFieldIndex === 0) {
        return setSelectedFieldIndex(endOfList);
      }

      setSelectedFieldIndex(selectedFieldIndex - 1);
    }

    if (partialToken.field && mockFields[partialToken.field]) {
      // user has a real field set
      if (partialToken.operator) {
        setSelectingOption("value");
      } else {
        setSelectingOption("operator");
      }
    } else {
      setSelectingOption("field");
    }
  };

  const containerClick: MouseEventHandler<HTMLDivElement> = (event) => {
    // ignore clicks from other elements on top
    if (event?.target !== searchBoxRef.current) return;

    if (selectingOption) {
      closeOptions();
      return;
    }

    resetOptions();

    // I can't remember why this needs a setTimeout to work. Rendering order?
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  const removeToken = (token: Token) => {
    setTokens(tokens.toSpliced(tokens.indexOf(token), 1));
  };

  return (
    <div className="searchbar-container" onClick={containerClick}>
      <div ref={searchBoxRef} className="search-box">
        <span className="search-icon">🔍</span>

        {tokens.map((token) => (
          <Chip key={token.text} token={token} removeToken={removeToken} />
        ))}

        <div className="search-content"></div>

        {setSelectingOption !== null && options && (
          <>
            <div className="selecting-mask" onClick={closeOptions}></div>
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              value={currentInput}
              onChange={(event) => setCurrentInput(event.target.value)}
              onKeyUp={onKeyUp}
              placeholder=""
              autoComplete="off"
            />
            <SearchBarOptions
              options={options}
              selectedFieldIndex={selectedFieldIndex}
            />
          </>
        )}
      </div>
      output would be sent to the table filtering
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  );
};
