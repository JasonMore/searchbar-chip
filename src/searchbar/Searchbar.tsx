import {
  createRef,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Searchbar.css";
import { SearchOptions, Token } from "./types.ts";
import { Chip } from "./Chip.tsx";
import { parseTextContent } from "./tokenize.ts";
import { SearchBarOptions } from "./SearchBarOptions.tsx";
import { mockFields } from "./searchbarMockData.ts";

export const Searchbar = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<null | number>(
    null,
  );

  const [selectingOption, setSelectingOption] = useState<
    null | "field" | "operator" | "value"
  >(null);

  const [tokenFocusIndex, setTokenFocusIndex] = useState<null | number>(null);
  const [tokens, setTokens] = useState<Partial<Token>[]>([]);

  // TODO: Populated by parsing table data
  const [fields, setFields] = useState<SearchOptions[]>(
    Object.values(mockFields),
  );
  const [operators, setOperators] = useState<SearchOptions[]>([]);
  const [values, setValues] = useState<SearchOptions[]>([]);

  const chipRefs = useMemo(
    () =>
      Array(tokens?.length ?? 0)
        .fill(0)
        .map(() => createRef<HTMLInputElement>()),
    [tokens?.length],
  );

  useEffect(() => {
    // hack: I'm struggling to focus the input when its newly created.
    // so if new and last, focus it
    if (tokens.length && !tokens[tokens.length - 1].text) {
      chipRefs[tokens.length - 1].current?.focus();
    }
  }, [chipRefs, tokens]);

  const field = useMemo(() => {
    if (tokenFocusIndex === null) return [];
    return fields.filter((f) =>
      f.name
        .toLowerCase()
        .includes(tokens[tokenFocusIndex].field?.toLowerCase() ?? ""),
    );
  }, [fields, tokenFocusIndex, tokens]);

  // the current list of options to show in the dropdown
  const options = selectingOption
    ? { field, operator: operators, value: values }[selectingOption]
    : [];

  const openOptions = (index: number) => {
    setTokenFocusIndex(index);
    nextOperator(tokens[index]);
  };

  const closeOptions = () => {
    setSelectedFieldIndex(null);
    setSelectingOption(null);
  };

  const resetOptions = () => {
    setSelectedFieldIndex(null);
    setSelectingOption("field");
  };

  const nextOperator = (token: Token) => {
    if (token.field && mockFields[token.field.toLowerCase()]) {
      // user has a real field set
      if (token.operator) {
        setSelectingOption("value");
        setValues(mockFields[token.field.toLowerCase()]?.values ?? []);
      } else {
        setSelectingOption("operator");
        setOperators(mockFields[token.field.toLowerCase()]?.operators);
      }
    } else {
      setSelectingOption("field");
      setValues(Object.values(mockFields));
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
      updateToken(
        `${partialToken.field}${partialToken.operator}${values[optionIndex].name}`,
      );
      closeOptions();
    }
  };

  const onOptionClicked = (optionIndex: number) => {
    if (tokenFocusIndex === null) return;
    optionSelected(parseTextContent(tokens[tokenFocusIndex].text), optionIndex);
  };

  const containerClick: MouseEventHandler<HTMLDivElement> = (event) => {
    // ignore clicks from other elements on top
    if (event?.target !== searchBoxRef.current) return;

    resetOptions();
    newToken();
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
    if (tokenFocusIndex === null) return;
    const parsedToken = parseTextContent(text);
    nextOperator(parsedToken);

    const newTokens = [
      ...tokens.slice(0, tokenFocusIndex),
      parsedToken,
      ...tokens.slice(tokenFocusIndex + 1),
    ];
    setTokens(newTokens);
  };

  const removeToken = () => {
    if (tokenFocusIndex === null) return;
    setTokens(tokens.toSpliced(tokenFocusIndex, 1));
  };

  const newToken = () => {
    setTokens([...tokens, parseTextContent()]);
    focusLastInput();
  };

  const focusLastInput = () => {
    // hack:
    setTimeout(() => {
      chipRefs[chipRefs.length - 1]?.current?.focus();
    }, 25);
  };

  const selectOption = () => {
    if (tokenFocusIndex === null) return;
    const token = tokens[tokenFocusIndex];
    const parsedToken = parseTextContent(token.text);

    if (selectedFieldIndex !== null) {
      optionSelected(parsedToken, selectedFieldIndex);
    } else {
      closeOptions();
    }
  };

  return (
    <div className="searchbar-container" onClick={containerClick}>
      <div ref={searchBoxRef} className="search-box">
        <span className="search-icon">🔍</span>
        {selectingOption !== null && (
          <>
            {/*TODO: Make click mask work with multiple input elements*/}
            {/*<div className="search-click-mask" onClick={closeOptions} />*/}
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
            removeToken={removeToken}
            prevOption={prevOption}
            nextOption={nextOption}
            selectOption={selectOption}
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
