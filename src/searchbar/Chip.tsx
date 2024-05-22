import "./Chip.css";
import type { Token } from "./types.ts";
import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  RefObject,
  useState,
} from "react";
import { SearchBarOptions } from "./SearchBarOptions.tsx";

type Props = {
  token: Token;
  updateToken: (token: Token) => void;
  removeToken: (token: Token) => void;
  prevOption: () => void;
  nextOption: () => void;
  prevChipRef: RefObject<HTMLInputElement>;
  nextChipRef: RefObject<HTMLInputElement>;
};

export const Chip = forwardRef<HTMLInputElement, Props>(
  (
    {
      token,
      removeToken,
      updateToken,
      prevOption,
      nextOption,
      prevChipRef,
      nextChipRef,
    },
    ref,
  ) => {
    // const [currentInput, setCurrentInput] = useState(token.text)

    // const valid = token.operator !== "unknown";

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const isAtStart = event.currentTarget.selectionStart === 0;
      const isAtEnd =
        event.currentTarget.selectionStart === event.currentTarget.value.length;

      if (event.key === "ArrowLeft" && isAtStart) {
        event.preventDefault();
        if (prevChipRef?.current) {
          prevChipRef.current.focus();
          prevChipRef.current.selectionStart = prevChipRef.current.value.length;
        }
      }

      if (event.key === "ArrowRight" && isAtEnd) {
        event.preventDefault();
        if (nextChipRef?.current) {
          nextChipRef.current.focus();
          nextChipRef.current.selectionStart = 0;
        }
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        nextOption();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        prevOption();
      }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      updateToken({ ...token, text: event.currentTarget.value });
    };

    return (
      <div>
        {/*<div className="search-click-mask" onClick={closeOptions} />*/}
        <input
          ref={ref}
          className="search-input"
          type="text"
          value={token.text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder=""
          autoComplete="off"
        />

        {/*<span className="chip-remove" onClick={() => removeToken(token)}>*/}
        {/*  X*/}
        {/*</span>*/}
      </div>
    );
  },
);
