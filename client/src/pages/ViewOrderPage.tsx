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
import StartMenuButton from "../components/StartMenuButtonComponent";

export interface InstallationDetails {
  cableLength?: string;
  facadeDetails?: string;
  floorDetails?: string;
  // id: number;
  mountingType?: string;
  liftNeeded?: string;
  notes?: string;
  // orderId: number;
  remoteControl?: string;
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
  const [disabled, setDisabled] = useState(id ? true : false);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [options, setOptions] = React.useState<Customer[]>([]);
  const [notes, setNotes] = useState("");
  const [montering, setMontering] = useState<string>("");
  const [lift, setLift] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>();
  const [customerCart, setCustomerCart] = useState<Product[]>([]);
  const [editCartItem, setEditCartItem] = useState<EditCartItem>();
  const [hidden, setHidden] = useState(true);
  const [product, setProduct] = useState("");
  const [installationDetails, setInstallationDetails] =
    useState<InstallationDetails>({
      mountingType: "",
      facadeDetails: "",
      floorDetails: "",
      cableLength: "",
      remoteControl: "",
      liftNeeded: "no",
      notes: "",
      // id: 0,
      // orderId: 0,
    });

  const handleInstallationDetailsUpdate = (
    attribute: string,
    value: string,
  ) => {
    setInstallationDetails((prev) => ({ ...prev, [attribute]: value }));
  };

  const handleSubmit = async () => {
    if (id) {
      if (isEdit) {
        toast.success("you have now saved changes");
        try {
          const response = await fetch(`${baseUrl}/api/order/update/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            toast.success("Order Updated Successfully!");
          }
          if (!response.ok) {
            toast.error(`Something went wrong! Status: ${response.status}`);
          }
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
        }
        setIsEdit(false);
      } else {
        toast.success("you have now activated edit mode");
        setIsEdit(true);
        setDisabled(false);
      }
    } else {
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
          // console.log(data);
          setNotes("");
          setCustomerCart([]);
          // setInstallationDetails({})
        }
        if (!response.ok) {
          toast.error(`Something went wrong! Status: ${response.status}`);
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

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
          setOrder(data.order);
          setCustomer(data.customer);
          if (data.order) {
            setNotes(data.order.notes);
            setCustomerCart(data.order.orderItems);
            setInstallationDetails(data.order.installationDetails);
            setLift(
              data.order.installationDetails.liftNeeded === "yes"
                ? true
                : false,
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    const currentCustomer = customer?.customerNumber;
    setFormData({
      customerNumber: currentCustomer,
      orderItems: customerCart,
      notes: notes,
      installationDetails: installationDetails,
    });
  }, [customerCart, customer, notes, installationDetails]);

  return (
    <>
      <Navbar title="Se Order" />
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

        <Accordion title="Montering" primary>
          <form className="flex flex-col">
            <fieldset disabled={disabled}>
              <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Montering
              </label>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex mb-3">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                  <div className="flex items-center ps-3">
                    <input
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      type="radio"
                      name="montering"
                      value="normal"
                      checked={installationDetails.mountingType === "normal"}
                      onChange={(e) => {
                        setMontering(e.target.value);
                        handleInstallationDetailsUpdate(
                          "mountingType",
                          e.target.value,
                        );
                      }}
                    />
                    <label
                      htmlFor="normal"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                    >
                      Normal
                    </label>
                  </div>
                </li>

                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                  <div className="flex items-center ps-3">
                    <input
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      type="radio"
                      name="montering"
                      value="advanced"
                      checked={installationDetails.mountingType === "advanced"}
                      onChange={(e) => {
                        setMontering(e.target.value);
                        handleInstallationDetailsUpdate(
                          "mountingType",
                          e.target.value,
                        );
                      }}
                    />
                    <label
                      htmlFor="avancerad"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                    >
                      Avancerad
                    </label>
                  </div>
                </li>
              </ul>

              <div className="flex w-full space-x-5">
                <div className="w-full">
                  <label
                    htmlFor="våning"
                    className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                  >
                    Våning
                  </label>
                  <br />
                  <input
                    className="appearance-none w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    id="våning"
                    value={installationDetails.floorDetails}
                    onChange={(e) => {
                      handleInstallationDetailsUpdate(
                        "floorDetails",
                        e.target.value,
                      );
                    }}
                  ></input>
                </div>
                <div className="w-full">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                    Fasad
                  </label>
                  <br />
                  <input
                    type="text"
                    id="fasad"
                    value={installationDetails.facadeDetails}
                    className="appearance-none w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    onChange={(e) => {
                      handleInstallationDetailsUpdate(
                        "facadeDetails",
                        e.target.value,
                      );
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full space-x-5 mb-3">
                <div className="w-full">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                    Kabel
                  </label>
                  <br />
                  <input
                    type="text"
                    id="kabel"
                    value={installationDetails.cableLength}
                    className="appearance-none w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    onChange={(e) => {
                      handleInstallationDetailsUpdate(
                        "cableLength",
                        e.target.value,
                      );
                    }}
                  ></input>
                </div>

                <div className="w-full">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                    Fjärrkontroll
                  </label>
                  <br />
                  <input
                    type="text"
                    id="fjärrkontroll"
                    value={installationDetails.remoteControl}
                    className="appearance-none w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    onChange={(e) => {
                      handleInstallationDetailsUpdate(
                        "remoteControl",
                        e.target.value,
                      );
                    }}
                  ></input>
                </div>
              </div>

              <div className="flex items-center ps-4 border border-gray-200 rounded-lg mb-5">
                <input
                  type="checkbox"
                  id="lift"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  checked={lift}
                  onChange={(e) => {
                    setLift(e.target.checked);
                    handleInstallationDetailsUpdate(
                      "liftNeeded",
                      `${e.target.checked ? "yes" : "no"}`,
                    );
                  }}
                />
                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                  Behövs lift?
                </label>
              </div>
              <div className="flex w-full space-x-5 mb-3">
                <div className="w-full">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                    Monteringsanteckningar
                  </label>
                  <textarea
                    id="monteringsanteckningar"
                    value={installationDetails.notes}
                    className="appearance-none w-full text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white min-h-[160px]"
                    maxLength={2000}
                    onChange={(e) => {
                      handleInstallationDetailsUpdate("notes", e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </fieldset>
          </form>
        </Accordion>

        <CustomerCartComponent
          cart={customerCart}
          cartCallBack={setCustomerCart}
          editCartItem={setEditCartItem}
          disabled
        ></CustomerCartComponent>

        <StartMenuButton
          text={id ? (isEdit ? "Spara" : "Ändra order") : "Skapa order"}
          handleSubmit={handleSubmit}
        />
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
}
export default EditCustomerPage;
