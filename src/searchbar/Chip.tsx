import "./Chip.css";
import type { Token } from "./types.ts";

type Props = {
  token: Token
}


export const Chip = ({token}:Props) =>{
  return <span className="chip">{token.text}</span>
}