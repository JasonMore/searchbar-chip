import "./Chip.css";
import type { Token } from "./types.ts";

type Props = {
  token: Token;
  removeToken: (token: Token) => void;
};

export const Chip = ({ token, removeToken }: Props) => {
  const valid = token.operator != "unknown";
  return (
    <div className={`chip ${valid ? "chip-valid" : ""}`}>
      <span className="chip-text">{token.text}</span>
      <span className="chip-remove" onClick={() => removeToken(token)}>
        X
      </span>
    </div>
  );
};
