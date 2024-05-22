import {
  createRef,
  KeyboardEvent,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Searchbar.css";
import { SearchOptions, Token } from "./types.ts";
import { Chip } from "./Chip.tsx";
import { parseTextContent, tokenize } from "./tokenize.ts";
import { SearchBarOptions } from "./SearchBarOptions.tsx";
import {
  mockFieldOptions,
  mockFields,
  mockSetTokens,
  mockValueOptions,
} from "./searchbarMockData.ts";

const operators = [
  { name: ":-", description: "Not - do not include" },
  { name: ":<", description: "Less Than - values below or earlier than" },
  { name: ":>", description: "Greater Than - values above or later than" },
  { name: ":", description: "Equals - exactly this value" },
];

export const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  // const [currentInput, setCurrentInput] = useState("");
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<null | number>(
    null,
  );

  const [selectingOption, setSelectingOption] = useState<
    null | "field" | "operator" | "value"
  >(null);

  const [tokenFocusIndex, setTokenFocusIndex] = useState<null | number>(null);

  const [tokens, setTokens] = useState<Partial<Token>[]>(mockSetTokens);

  // TODO: Populated by parsing table data
  const [fields, setFields] = useState<SearchOptions[]>(mockFieldOptions);
  const [values, setValues] = useState<SearchOptions[]>(mockValueOptions);

  // chips
  const chipRefs = useMemo(
    () => tokens.map(() => createRef<HTMLInputElement>()),
    [tokens],
  );

  // const tokenizeInput = (textContent: string = "") => {
  //   setTokens(tokens.concat(tokenize(textContent, "string")));
  // };

  // the current list of options to show in the dropdown
  const options = selectingOption
    ? { field: fields, operator: operators, value: values }[selectingOption]
    : [];

  const openOptions = (index: number) => {
    setTokenFocusIndex(index);
    if (selectingOption === null) {
      resetOptions();
    }
  };

  const closeOptions = () => {
    setSelectedFieldIndex(null);
    setSelectingOption(null);
  };

  const resetOptions = () => {
    setSelectedFieldIndex(null);
    setSelectingOption("field");
  };

  const derpderp = (token: Token) => {
    if (token.field && mockFields[token.field]) {
      // user has a real field set
      if (token.operator) {
        setSelectingOption("value");
      } else {
        setSelectingOption("operator");
      }
    } else {
      setSelectingOption("field");
    }
  };

  const optionSelected = (
    partialToken: Partial<Token>,
    optionIndex: number,
  ) => {
    if (selectingOption === "field") {
      setSelectedFieldIndex(null);
      setSelectingOption("operator");
      updateToken(`${fields[optionIndex].name}`);
      return;
    }

    if (selectingOption === "operator") {
      setSelectedFieldIndex(null);
      setSelectingOption("value");
      updateToken(`${partialToken.field}${operators[optionIndex].name}`);
      return;
    }

    if (selectingOption === "value") {
      // no return, as if selecting final value, assume they also want to immediately tokenize
      updateToken(`${partialToken.field}${partialToken.operator}${values[optionIndex].name}`)
      // newToken()
      // tokenizeInput(textContent);
      closeOptions();
    }
  };

  // const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
  //   const textContent = event.currentTarget.value;
  //   const partialToken = parseTextContent(textContent);
  //
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //
  //     // replace field or value
  //     if (selectedFieldIndex !== null) {
  //       optionSelected(partialToken, selectedFieldIndex);
  //       return;
  //     }
  //
  //     // dropdown not active, user intends to set value
  //     tokenizeInput(textContent);
  //     closeOptions();
  //   }
  //
  //   const endOfList = options?.length - 1;
  //
  //   if (event.key === "ArrowDown") {
  //     event.preventDefault();
  //
  //     if (selectedFieldIndex === null || selectedFieldIndex === endOfList) {
  //       return setSelectedFieldIndex(0);
  //     }
  //
  //     setSelectedFieldIndex(selectedFieldIndex + 1);
  //   }
  //
  //   if (event.key === "ArrowUp") {
  //     event.preventDefault();
  //
  //     if (selectedFieldIndex === null || selectedFieldIndex === 0) {
  //       return setSelectedFieldIndex(endOfList);
  //     }
  //
  //     setSelectedFieldIndex(selectedFieldIndex - 1);
  //   }
  //
  //   if (partialToken.field && mockFields[partialToken.field]) {
  //     // user has a real field set
  //     if (partialToken.operator) {
  //       setSelectingOption("value");
  //     } else {
  //       setSelectingOption("operator");
  //     }
  //   } else {
  //     setSelectingOption("field");
  //   }
  // };

  const onOptionClicked = (optionIndex: number) => {
    optionSelected(parseTextContent(tokens[tokenFocusIndex].text), optionIndex);
  };

  const containerClick: MouseEventHandler<HTMLDivElement> = (event) => {
    // ignore clicks from other elements on top
    if (event?.target !== searchBoxRef.current) return;

    resetOptions();

    // I can't remember why this needs a setTimeout to work. Rendering after useState changes?
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  const endOfList = options?.length - 1;

  const prevOption = () => {
    if (selectedFieldIndex === null || selectedFieldIndex === 0) {
      return setSelectedFieldIndex(endOfList);
    }

    setSelectedFieldIndex(selectedFieldIndex - 1);
  };

  const nextOption = () => {
    if (selectedFieldIndex === null || selectedFieldIndex === endOfList) {
      return setSelectedFieldIndex(0);
    }

    setSelectedFieldIndex(selectedFieldIndex + 1);
  };

  const updateToken = (text: string) => {
    const parsedToken = parseTextContent(text);

    derpderp(parsedToken);

    const newTokens = [
      ...tokens.slice(0, tokenFocusIndex),
      parsedToken,
      ...tokens.slice(tokenFocusIndex + 1),
    ];
    setTokens(newTokens);
  };

  const removeToken = () => {
    setTokens(tokens.toSpliced(tokenFocusIndex, 1));
  };

  const newToken = () => {
    setTokens([...tokens, parseTextContent()]);
  };

  const selectOption = () => {
    const token = tokens[tokenFocusIndex];
    const parsedToken = parseTextContent(token.text);

    derpderp(parsedToken);

    // // replace field or value
    // if (selectedFieldIndex !== null) {
    //   optionSelected(partialToken, selectedFieldIndex);
    //   return;
    // }
    //
    // // dropdown not active, user intends to set value
    // tokenizeInput(tokens[index].text);
    // closeOptions();
  };

  return (
    <div className="searchbar-container" onClick={containerClick}>
      <div ref={searchBoxRef} className="search-box">
        <span className="search-icon">🔍</span>

        {selectingOption !== null && (
          <>
            <div className="search-click-mask" onClick={closeOptions} />
            <SearchBarOptions
              options={options}
              selectedFieldIndex={selectedFieldIndex}
              onOptionClicked={onOptionClicked}
            />
          </>
        )}

        {tokens.map((token, index) => (
          <Chip
            key={index}
            ref={chipRefs[index]}
            token={token}
            updateToken={(text) => updateToken(text)}
            removeToken={() => removeToken()}
            prevOption={prevOption}
            nextOption={nextOption}
            selectOption={() => selectOption()}
            onFocus={() => openOptions(index)}
            newToken={newToken}
            prevChipRef={chipRefs[index - 1]}
            nextChipRef={chipRefs[index + 1]}
          />
        ))}
      </div>
      <div>
        <h2>output would be sent to the table filtering</h2>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>
      </div>
    </div>
  );
};
