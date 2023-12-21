import React, { useState } from "react";

import { Customer } from "../components/searchBar/CustomSearch";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import SearchBarComponent from "../components/searchBar/MuiSearchBarComponent";

export default function CreateOrderPageComponent() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  const handleCustomerSelect = (selectedCustomer: Customer) => {
    setCustomer(selectedCustomer);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl mb-11">Skapa Order</h1>
      <div className="flex">
        <div className="flex flex-col flex-grow">
          <SearchBarComponent onCustomerSelect={handleCustomerSelect}/>
          <ContactDateComponent heading={"Datum"} />
        </div>
        <CustomerDetailsComponent customer={customer} />
      </div>
    </div>
  );
}
