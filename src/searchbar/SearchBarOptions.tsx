import "./searchbarOptions.css";
import { SearchOptions } from "./types.ts";

type Props = {
  options: SearchOptions[];
  selectedFieldIndex: number | null;
  onOptionClicked: (index: number) => void
};

export const SearchBarOptions = ({ options, selectedFieldIndex, onOptionClicked }: Props) => {
  return (
    <div className="searchbarOptions-container">
      {options.map((field, index) => (
        <div
          key={index + field.name}
          className={`search-row ${selectedFieldIndex === index ? "search-selected" : ""}`}
          onClick={() => onOptionClicked(index)}
        >
          <span>{field.name}</span>
          <span>{field.description ?? field.type}</span>
        </div>
      ))}
      {options.length === 0 && (
        <span>TODO: Conditionally message based on type. Type any value</span>
      )}
    </div>
  );
};
