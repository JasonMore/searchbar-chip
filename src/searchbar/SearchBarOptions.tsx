import "./searchbarOptions.css";
import type { SearchOptions } from "./types.ts";



type Props = {
  options: SearchOptions[];
  selectedFieldIndex: number | null;
};

export const SearchBarOptions = ({ options, selectedFieldIndex }: Props) => {
  return (
    <div className="searchbarOptions-container">
      {options.map((field, index) => (
        <span
          key={index + field.name}
          className={`search-row ${selectedFieldIndex === index ? "search-selected" : ""}`}
        >
          {field.name}
        </span>
      ))}
    </div>
  );
};
