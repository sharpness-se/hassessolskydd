import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/NavbarComponent";
import toast, { Toaster } from "react-hot-toast";
import { FormData } from "./CreateOrderPage";
import { baseUrl } from "../settings/baseUrl";
import MuiSearchBarComponent, {
  Customer,
} from "../components/searchBar/MuiSearchBarComponent";
import ContactDateComponent from "../components/ContactDateComponent";
import CustomerDetailsComponent from "../components/CustomerDetailsComponent";
import Accordion from "../components/AccordionComponent";
import CustomerCartComponent from "../components/cart/CustomerCartComponent";
import Pilsegardin from "../components/createOrderProductForms/Plissegardin";
import Lamellgardin from "../components/createOrderProductForms/Lamellgardin";
import Terrassmarkis from "../components/createOrderProductForms/Terrassmarkis";
import Persienn from "../components/createOrderProductForms/Persienn";
import Rullgardin from "../components/createOrderProductForms/Rullgardin";
import Fönstermarkis from "../components/createOrderProductForms/Fönstermarkis";

export interface InstallationDetails {
  cableLength?: String,
  facadeDetails?: String,
  floorDetails?: String,
  id: Number,
  mountingType?: String,
  needLift?: String,
  notes?: String,
  orderId: Number,
  remoteControl: String,
}

export interface Product {
  name: string;
  productDetails: ProductAttribute[];
}
interface ProductAttribute {
  attribute: string;
  value: string;
}

export interface EditCartItem {
  cartItemIndex: number;
  cartItem: Product;
}

function EditCustomerPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<FormData>();
  const [disabled, setDisabled] = useState(true);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [options, setOptions] = React.useState<Customer[]>([]);
  const [notes, setNotes] = useState('');
  const [montering, setMontering] = useState<string>("");
  const [lift, setLift] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>();
  const [customerCart, setCustomerCart] = useState<Product[]>([]);
  const [editCartItem, setEditCartItem] = useState<EditCartItem>();
  const [hidden, setHidden] = useState(true);
  const [product, setProduct] = useState("");


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
        setNotes("");
        setCustomerCart([])
        // setInstallationDetails({})
      }
      if (!response.ok) {
        toast.error(`Something went wrong! Status: ${response.status}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

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
          console.table(data.order)
          if (data.order) {
            setNotes(data.order.notes);
            setCustomerCart(data.order.orderItems);
          }
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
              disabled={disabled}
            />
            <ContactDateComponent heading={"Datum"} />
          </div>
          <div className="flex-2">
            <CustomerDetailsComponent customer={customer} />
          </div>
        </div>

        <Accordion title="Produkter" applyHeight customOnClick primary>
          {hidden && (
            <div className={"w-full"}>
              <label
                htmlFor="mySelect"
                className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              >
                Välj en produkt:
              </label>
              <br />
              <select
                disabled={disabled}
                id="myselect"
                onChange={(e) => {
                  setProduct(e.target.value);
                  setHidden(false);
                }}
                value={product}
                className="w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                <option
                  className="text-xs font-bold text-gray-700"
                  value=""
                  disabled
                  hidden
                >
                  Produkt...
                </option>
                <option value="Plisségardin">Pilsségardin</option>
                <option value="Lamellgardin">Lamellgardin</option>
                <option value="Terrassmarkis">Terrassmarkis</option>
                <option value="Rullgardin">Rullgardin</option>
                <option value="Persienn">Persienn</option>
                <option value="Fönstermarkis">Fönstermarkis</option>
              </select>
            </div>
          )}
          {!hidden &&
            (product === "Pilsegardin" || product === "Plisségardin") && (
              <Pilsegardin
                cartItem={editCartItem}
                editCartItem={setEditCartItem}
                product={product}
                clearOnClick={() => {
                  setHidden(true);
                  setProduct("");
                }}
                cartCallback={setCustomerCart}
              />
            )}
          {!hidden && product === "Lamellgardin" && (
            <Lamellgardin
              cartItem={editCartItem}
              editCartItem={setEditCartItem}
              product={product}
              clearOnClick={() => {
                setHidden(true);
                setProduct("");
              }}
              cartCallback={setCustomerCart}
            />
          )}
          {!hidden && product === "Terrassmarkis" && (
            <Terrassmarkis
              cartItem={editCartItem}
              editCartItem={setEditCartItem}
              product={product}
              clearOnClick={() => {
                setHidden(true);
                setProduct("");
              }}
              cartCallback={setCustomerCart}
            />
          )}
          {!hidden && product === "Rullgardin" && (
            <Rullgardin
              cartItem={editCartItem}
              editCartItem={setEditCartItem}
              product={product}
              clearOnClick={() => {
                setHidden(true);
                setProduct("");
              }}
              cartCallback={setCustomerCart}
            />
          )}
          {!hidden && product === "Persienn" && (
            <Persienn
              cartItem={editCartItem}
              editCartItem={setEditCartItem}
              product={product}
              clearOnClick={() => {
                setHidden(true);
                setProduct("");
              }}
              cartCallback={setCustomerCart}
            />
          )}
          {!hidden && product === "Fönstermarkis" && (
            <Fönstermarkis
              cartItem={editCartItem}
              editCartItem={setEditCartItem}
              product={product}
              clearOnClick={() => {
                setHidden(true);
                setProduct("");
              }}
              cartCallback={setCustomerCart}
            />
          )}
        </Accordion>

        <Accordion title={"Anteckningar"} primary>
          <textarea
            disabled={disabled}
            id="anteckningar"
            className="appearance-none w-full text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white min-h-[160px]"
            value={notes}
            maxLength={2000}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          ></textarea>
        </Accordion>

        <CustomerCartComponent
          handleSubmit={handleSubmit}
          cart={customerCart}
          cartCallBack={setCustomerCart}
          editCartItem={setEditCartItem}
          disabled
        ></CustomerCartComponent>
        
      </div>
    </>
  );
}
export default EditCustomerPage;
