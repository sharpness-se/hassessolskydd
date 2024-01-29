import React, { useEffect, useState } from "react";

import MuiSearchBarComponent, {
  Customer,
} from "../components/searchBar/MuiSearchBarComponent";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import Accordion from "../components/AccordionComponent";
import { baseUrl } from "../settings/baseUrl";
import CustomerCartComponent from "../components/cart/CustomerCartComponent";

import toast, { Toaster } from "react-hot-toast";
import Pilsegardin from "../components/createOrderProductForms/Pilsegardin";
import Navbar from "../components/NavbarComponent";

export interface Product {
  name: string;
  attributes: string[];
  values: string[];
}
export interface FormData {
  customerNumber?: string;
  measurementDate?: Date;
  notes?: string;
  instalationDetails?: string;
  indoorOutdoor?: string;
  orderItems?: Product[];
}

export default function CreateOrderPageComponent() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [options, setOptions] = React.useState<Customer[]>([]);
  const [hidden, setHidden] = useState(true);
  const [product, setProduct] = useState("");
  const [customerCart, setCustomerCart] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>();
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

  useEffect(() => {
    const currentCustomer = customer?.customerNumber;
    setFormData({
      customerNumber: currentCustomer,
      orderItems: customerCart,
    });
  }, [customerCart, customer]);

  const handleSubmit = async () => {
    console.log("Updated formData:", formData);
    if (!formData?.customerNumber) {
      toast.error("Please Select a Customer!");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Order Submitted Successfully!");
        const data = await response.json();
        console.log(data);
      }
      if (!response.ok) {
        toast.error(`Something went wrong! Status: ${response.status} `);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar title="Skapa Order" />

      <div className="flex min-h-screen flex-col items-center p-20 xl:px-60">
        {/* <h1 data-test="hero-heading" className="text-5xl mb-11 min-w-max">
          Skapa Order
        </h1> */}
        <div className="flex w-full justify-center mt-10 z-0">
          <div className="flex flex-col mb-[22px]">
            <MuiSearchBarComponent
              setSelectedCustomer={setCustomer}
              selectedCustomer={customer}
              options={options}
              setOptions={setOptions}
            />
            <ContactDateComponent heading={"Datum"} />
          </div>
          <div className="flex-2">
            <CustomerDetailsComponent customer={customer} />
          </div>
        </div>
        <Accordion title={"Produkter"} applyHeight customOnClick>
          {hidden && (
            <div className={"flex justify-center items-center w-full h-full"}>
              <label
                htmlFor="mySelect"
                className="tracking-wide uppercase font-bold text-s text-gray-700 mr-5"
              >
                Välj en produkt:
              </label>
              <select
                id="myselect"
                onChange={(e) => {
                  setProduct(e.target.value);
                  setHidden(false);
                }}
                value={product}
                className="p-2 px-3 border font-bold text-s text-gray-700"
              >
                <option
                  className="text-xs font-bold text-gray-700"
                  value=""
                  disabled
                  hidden
                >
                  Produkt...
                </option>
                <option value="Pilsegardin">Pilsegardin</option>
              </select>
            </div>
          )}
          {!hidden && product === "Pilsegardin" && (
            <Pilsegardin
              product={product}
              clearOnClick={() => {
                setHidden(true);
                setProduct("");
              }}
              cartCallback={setCustomerCart}
            />
          )}
        </Accordion>
        <CustomerCartComponent
          handleSubmit={handleSubmit}
          cart={customerCart}
          cartCallBack={setCustomerCart}
        ></CustomerCartComponent>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
}
