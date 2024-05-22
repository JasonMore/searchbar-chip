import "./Chip.css";
import type { Token } from "./types.ts";
import { forwardRef, KeyboardEvent, useRef } from "react";

type Props = {
  token: Token;
  removeToken: (token: Token) => void;
};

export const Chip = forwardRef<HTMLInputElement, Props>(
  ({ token, removeToken }, ref) => {
    const valid = token.operator != "unknown";

    const focusStart = () => {
      inputRef?.current?.focus();
      inputRef?.current?.selectionStart = 0;
    };

    const focusEnd = () => {
      inputRef?.current?.focus();
      inputRef?.current?.selectionStart = inputRef?.current?.value.length;
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      const isAtStart = e.currentTarget.selectionStart === 0;
      const isAtEnd =
        e.currentTarget.selectionStart === e.currentTarget.value.length;

      if (e.key === "ArrowLeft" && isAtStart) {
        e.preventDefault();
        onMoveLeft();
        // if (prevInputRef && prevInputRef.current) {
        //   prevInputRef.current.focus();
        //   prevInputRef.current.selectionStart = prevInputRef.current.value.length;
        // }
      }

      if (e.key === "ArrowRight" && isAtEnd) {
        e.preventDefault();
        if (nextInputRef && nextInputRef.current) {
          nextInputRef.current.focus();
          nextInputRef.current.selectionStart = 0;
        }
      }
    };

    return (
      <div className={`chip ${valid ? "chip-valid" : ""}`}>
        <input
          ref={ref}
          onKeyUp={onKeyUp}
          className="chip-text"
          value={token.text}
        />
        <span className="chip-remove" onClick={() => removeToken(token)}>
          X
        </span>
      </div>
    );
  },
);
