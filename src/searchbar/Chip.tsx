import "./Chip.css";
import type { Token } from "./types.ts";

type Props = {
  token: Token;
};

export const Chip = ({ token }: Props) => {
  return (
    <div className="chip">
      <span className="chip-text">{token.text}</span>
      <span className="chip-remove">X</span>
    </div>
  );
};
