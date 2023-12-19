import React from "react";
import { Customer } from "./CustomSearchComponent";

interface CustomerDetailsProps {
  customer: Customer | undefined;
}

const CustomerDetailsComponent: React.FC<CustomerDetailsProps> = ({
  customer,
}) => {
  return (
    <div className="bg-white rounded p-5 flex-grow h-auto ml-5 w-64">
      <label
        htmlFor="name"
        className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5"
      >
        Namn
      </label>
      <p id="name">
        {customer ? `${customer?.firstname} ${customer.lastname}` : "-"}
      </p>
      <label
        htmlFor="kundnummer"
        className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5"
      >
        Kundnummer
      </label>
      <p id="kundnummer">{customer ? customer.customerNumber : "-"}</p>
      <label
        id="email"
        className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5"
      >
        E-post
      </label>
      <p id="email">{customer ? customer?.email : "-"}</p>
      <label
        htmlFor="telefon"
        className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5"
      >
        Telefonnummer
      </label>
      <p id="telefon">{customer ? customer?.phoneNumber : "-"}</p>
      <label
        htmlFor="adress"
        className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5"
      >
        Adress
      </label>
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
