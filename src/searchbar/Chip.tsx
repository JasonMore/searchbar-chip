import "./Chip.css";
import type { Token } from "./types.ts";

type Props = {
  token: Token;
};

export const Chip = ({ token }: Props) => {
  const valid = token.operator != "unknown";
  return (
    <div className={`chip ${valid ? "chip-valid" : ""}`}>
      <span className="chip-text">{token.text}</span>
      <span className="chip-remove">X</span>
    </div>
  );
};
