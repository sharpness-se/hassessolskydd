import React, { useState } from "react";

import { Customer } from "../components/searchBar/CustomSearch";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import SearchBarComponent from "../components/searchBar/MuiSearchBarComponent";
import Accordion from "../components/Accordion";

export default function CreateOrderPageComponent() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  const handleCustomerSelect = (selectedCustomer: Customer) => {
    setCustomer(selectedCustomer);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl mb-11">Skapa Order</h1>
      <div className="flex mb-5 w-full">
        <div className="flex flex-col flex-1">
          <SearchBarComponent onCustomerSelect={handleCustomerSelect} />
          <ContactDateComponent heading={"Datum"} />
        </div>
        <div className="flex-2">
          <CustomerDetailsComponent customer={customer} />
        </div>
      </div>
      <Accordion title={"Typ av ärende"}>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            omnis quo. Perferendis, quos temporibus asperiores, fugit veritatis
            sed repellendus voluptate laudantium illum aspernatur vero?
            Quibusdam doloribus dolor voluptates natus est.
          </p>
        </div>
      </Accordion>
    </div>
  );
}
