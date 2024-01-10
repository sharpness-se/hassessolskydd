import React, { useEffect, useState } from "react";

import MuiSearchBarComponent, {
  Customer,
} from "../components/searchBar/MuiSearchBarComponent";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import Accordion from "../components/AccordionComponent";
import { baseUrl } from "../settings/baseUrl";

export default function CreateOrderPageComponent() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [options, setOptions] = React.useState<Customer[]>([]);

  useEffect(() => {
    const prepareUrl = () => {
      const url = `${baseUrl}/api/customers`;
      return encodeURI(url);
    };

    const fetchData: () => Promise<void> = async () => {
      try {
        const response = await fetch(prepareUrl(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 204) {
          console.log("No Customers Found!");
        } else {
          const data = await response.json();
          setOptions(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-20 xl:px-60">
      <h1 data-test="hero-heading" className="text-5xl mb-11 min-w-max">
        Skapa Order
      </h1>
      <div className="flex w-full justify-center">
        <div className="flex flex-col mb-[22px]">
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
              omnis quo. Perferendis, quos temporibus asperiores, fugit
              veritatis sed repellendus voluptate laudantium illum aspernatur
              vero? Quibusdam doloribus dolor voluptates natus est.
            </p>
          </div>
        </Accordion>
    </div>
  );
}
