import React, { useState} from "react";

import MuiSearchBarComponent, { Customer } from "../components/searchBar/MuiSearchBarComponent";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import { list } from "../components/searchBar/fakedata";
import Accordion from "../components/Accordion";


export default function CreateOrderPageComponent() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [options, setOptions] = React.useState<Customer[]>(list);
 
  return (
    <div className="flex min-h-screen flex-col items-center p-24 xl:px-60">
      <h1 className="text-5xl mb-11">Skapa Order</h1>
      <div className="flex">
        <div className="flex flex-col flex-grow">
          <MuiSearchBarComponent
            setSelectedCustomer={setCustomer}
            selectedCustomer={customer}
            options={options}
            setOptions={setOptions}
          />
          <ContactDateComponent heading={"Typ av ärende"} />
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
