import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/NavbarComponent";
import { FormData, InstallationDetails } from "./CreateOrderPage";
import { baseUrl } from "../settings/baseUrl";
import MuiSearchBarComponent, {
  Customer,
} from "../components/searchBar/MuiSearchBarComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";

function EditCustomerPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<FormData>();
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [options, setOptions] = React.useState<Customer[]>([]);

  useEffect(() => {
    const prepareUrl = () => {
      const url = `${baseUrl}/api/order/withcustomer/${id}`;
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
          console.log("No order found");
        } else {
          const data = await response.json();
          setOrder(data.order)
          setCustomer(data.customer)
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar title="Se Order"/>
      <div className="flex min-h-screen flex-col items-center p-20 xl:px-60">
      <div className="flex w-full justify-center mt-10 z-0">
          <div className="flex flex-col mb-[22px]">
            <MuiSearchBarComponent
              setSelectedCustomer={setCustomer}
              selectedCustomer={customer}
              options={options}
              setOptions={setOptions}
              disabled
            />
            <ContactDateComponent heading={"Datum"} />
          </div>
          <div className="flex-2">
            <CustomerDetailsComponent customer={customer} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCustomerPage;
