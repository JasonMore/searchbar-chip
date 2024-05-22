import "./Chip.css";
import type { Token } from "./types.ts";
import { forwardRef, KeyboardEvent, RefObject } from "react";

type Props = {
  token: Token;
  removeToken: (token: Token) => void;
  prevChipRef: RefObject<HTMLInputElement>;
  nextChipRef: RefObject<HTMLInputElement>;
};

export const Chip = forwardRef<HTMLInputElement, Props>(
  ({ token, removeToken, prevChipRef, nextChipRef }, ref) => {
    const valid = token.operator !== "unknown";

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const isAtStart = e.currentTarget.selectionStart === 0;
      const isAtEnd =
        e.currentTarget.selectionStart === e.currentTarget.value.length;

      if (e.key === "ArrowLeft" && isAtStart) {
        e.preventDefault();
        if (prevChipRef?.current) {
          prevChipRef.current.focus();
          prevChipRef.current.selectionStart = prevChipRef.current.value.length;
        }
      }

      if (e.key === "ArrowRight" && isAtEnd) {
        e.preventDefault();
        if (nextChipRef?.current) {
          nextChipRef.current.focus();
          nextChipRef.current.selectionStart = 0;
        }
      }
    };

    return (
      <div className={`chip ${valid ? "chip-valid" : ""}`}>
        <input
          ref={ref}
          onKeyDown={onKeyDown}
          className="chip-text"
          value={token.text}
        />
        <span className="chip-remove" onClick={() => removeToken(token)}>
          X
        </span>
      </div>
    );
  }
);
