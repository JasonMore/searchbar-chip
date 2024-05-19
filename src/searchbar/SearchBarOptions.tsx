import "./searchbarOptions.css";
import type { Field } from "./types.ts";

type Props = {
  fields: Field[];
  selectedFieldIndex: number | null;
};

export const SearchBarOptions = ({ fields, selectedFieldIndex }: Props) => {
  return (
    <div className="searchbarOptions-container">
      {fields.map((field, index) => (
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
