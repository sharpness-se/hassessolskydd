import React from "react";
import { Customer } from "./searchBar/CustomSearch";

interface CustomerDetailsProps {
  customer: Customer | undefined;
}

const CustomerDetailsComponent: React.FC<CustomerDetailsProps> = ({
  customer,
}) => {
  return (
    <div className="bg-white rounded p-5 flex-grow h-auto ml-5 w-64">
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5">
        Namn
      </p>
      <p id="name">
        {customer ? `${customer?.firstname} ${customer.lastname}` : "-"}
      </p>
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5">
        Kundnummer
      </p>
      <p id="kundnummer">{customer ? customer.customerNumber : "-"}</p>
      <p
        id="email"
        className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5"
      >
        E-post
      </p>
      <p id="email">{customer ? customer?.email : "-"}</p>
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5">
        Telefonnummer
      </p>
      <p id="telefon">{customer ? customer?.phoneNumber : "-"}</p>
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5">
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
