import React, { useEffect, useState } from "react";

import MuiSearchBarComponent, {
  Customer,
} from "../components/searchBar/MuiSearchBarComponent";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import Accordion from "../components/AccordionComponent";
import { baseUrl } from "../settings/baseUrl";
import CustomerCartComponent from "../components/cart/CustomerCartComponent";
import CreateOrderFormComponent from "../components/createOrderForm/CreateOrderFormComponent";

export interface Product {
  name: string;
  attributes: string[];
  values: string[];
}

export default function CreateOrderPageComponent() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [options, setOptions] = React.useState<Customer[]>([]);
  const [hidden, setHidden] = useState(true);
  const [product, setProduct] = useState("");
  const [customerCart, setCustomerCart] = useState<Product[]>([]);

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
    console.log(customerCart);
  }, [customerCart]);
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
      <Accordion title={"Typ av ärende"} applyHeight customOnClick>
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
          <CreateOrderFormComponent
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
        cart={customerCart}
        cartCallBack={setCustomerCart}
      ></CustomerCartComponent>
    </div>
  );
}
