import React, { useState } from "react";
import SearchBar from "../components/CustomSearchComponent";

export default function CreateOrderPageComponent() {
  interface Customer {
    id: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    error?: string;
  }

  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  const handleCustomerSelect = (selectedCustomer: Customer) => {
    setCustomer(selectedCustomer);
    console.log(customer);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl mb-11">Skapa Order</h1>
      <div className="flex">
        <div className="flex flex-col flex-grow">
          <div className="bg-white p-5 rounded w-full mb-5">
            <SearchBar onCustomerSelect={handleCustomerSelect}/>
          </div>
          <div className="bg-white rounded p-5 w-full">
            <h2 className="uppercase tracking-wide text-gray-700 text-xs font-bold">Typ av ärende</h2>
          </div>
        </div>
        <div className="bg-white rounded p-5 flex-grow h-auto ml-5 w-64">
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">Telefonnummer</p>
          <p>{customer ? customer?.phoneNumber : '-'}</p>
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5">Adress</p>
          <p>
          {customer ? (
              <span>
                {customer?.address},
                <br />
                {`${customer?.postalCode} ${customer?.city}`}
              </span>
            ) : (
              '-'
            )}
          </p>
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold mt-5">E-post</p>
          <p>{customer ? customer?.email : '-'}</p>
        </div>
      </div>
    </div>
  );
}
