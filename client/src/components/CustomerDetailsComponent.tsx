import React from "react";
import { Customer } from "./searchBar/MuiSearchBarComponent";

interface CustomerDetailsProps {
  customer: Customer | undefined;
}

const CustomerDetailsComponent: React.FC<CustomerDetailsProps> = ({
  customer,
}) => {
  const renderDetail = (
    id: string,
    label: string,
    customer: Customer | undefined,
    property: keyof Customer
  ) => {
    const detail = customer ? customer[property] : undefined;
    return (
      <>
        <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">
          {label}
        </p>
        <p className="pb-5" id={id}>
          {detail !== undefined ? detail : "-"}
        </p>
      </>
    );
  };
  return (
    <div
      className="bg-white rounded p-5 flex-grow h-auto ml-5 w-64 pt-5"
      id="selectedResults"
    >
      {renderDetail("kundnummer", "Kundnummer", customer, "customerNumber")}
      {renderDetail("email", "E-post", customer, "email")}
      {renderDetail("telefon", "Telefonnummer", customer, "phoneNumber")}
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">
        Adress
      </p>
      <p id="adress">
        {customer ? (
          <span>
            {customer?.address},
            <br />
            {`${customer?.postalCode} ${customer?.city}`}
          </span>
        ) : (
          "-"
        )}
      </p>
    </div>
  );
};

export default CustomerDetailsComponent;
