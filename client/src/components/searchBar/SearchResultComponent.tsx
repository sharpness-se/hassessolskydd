import React from "react";
import { Customer } from "./CustomSearch";

interface SearchResultProps {
  item: Customer;
  error?: string | undefined;
  onSelect: (item: Customer) => void;
}

const SearchResultComponent: React.FC<SearchResultProps> = ({
  item,
  error,
  onSelect,
}) => {
  return error ? (
    <p key={item.id}>No Customer Found!</p>
  ) : (
    <p
      key={item.id + "para"}
      onClick={(e) => onSelect(item)}
      className="block my-2 hover:bg-blue-600 hover:text-white py-1 px-6 shadow-sm"
    >
      {`${item.firstname} ${item.lastname}, ${item.phoneNumber},`} <br />{" "}
      {`${item.email}`}
    </p>
  );
};

export default SearchResultComponent;
