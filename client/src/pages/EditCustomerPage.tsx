import React, { useEffect, useState } from "react";
import { Customer } from "../components/searchBar/MuiSearchBarComponent";
import { baseUrl } from "../settings/baseUrl";
import { useParams } from "react-router-dom";
import CreateCustomerComponent from "../components/CreateCustomerComponent";

function EditCustomerPage() {
  const [customer, setCustomer] = useState<Customer>();

  let { id } = useParams();
  useEffect(() => {
    const prepareUrl = (id: string | undefined) => {
      const url = `${baseUrl}/api/customer/customerNumber/${id}`;

      return encodeURI(url);
    };
    const fetchData: () => Promise<void> = async () => {
      try {
        const response = await fetch(prepareUrl(id), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 204) {
          console.log("No Customers Found!");
        } else {
          const data = await response.json();
          setCustomer(data);
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className="w-full max-w-lg rounded-lg p-10 bg-white shadow-md">
        <h2 className="text-xl font-bold text-gray-600 mb-3">
          Se Kund
              </h2>
              <CreateCustomerComponent customer={customer}/>
      </div>
    </div>
  );
}

export default EditCustomerPage;
