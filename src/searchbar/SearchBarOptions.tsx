import "./searchbarOptions.css";
import type { SearchOptions } from "./types.ts";



type Props = {
  options: SearchOptions[];
  selectedFieldIndex: number | null;
  onOptionClicked: (index: number) => void
};

export const SearchBarOptions = ({ options, selectedFieldIndex, onOptionClicked }: Props) => {
  return (
    <div className="searchbarOptions-container">
      {options.map((field, index) => (
        <span
          key={index + field.name}
          className={`search-row ${selectedFieldIndex === index ? "search-selected" : ""}`}
          onClick={() => onOptionClicked(index)}
        >
          {field.name}
        </span>
      ))}
    </div>
  );
};
