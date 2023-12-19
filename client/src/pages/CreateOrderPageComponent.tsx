import React, { useState } from "react";
import SearchBar from "../components/CustomSearchComponent";
import { Customer } from "../components/CustomSearchComponent";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import ContactDateComponent from "../components/ContactDateComponent";
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
          <SearchBar onCustomerSelect={handleCustomerSelect} />
          <ContactDateComponent heading={"Typ av ärende"} />
        </div>
        <CustomerDetailsComponent customer={customer} />
      </div>
    </div>
  );
}
