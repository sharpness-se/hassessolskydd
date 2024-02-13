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
export interface InstallationDetails {
  attributes?: string[];
  values?: string[];
}
export interface FormData {
  customerNumber?: string;
  measurementDate?: Date;
  notes?: string;
  installationDetails?: InstallationDetails;
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
  const [notes, setNotes] = useState<string>("");
  const [controller, setController] = useState<string>("");
  const [lift, setLift] = useState<boolean>(false);
  const [installationDetails, setInstallationDetails] =
    useState<InstallationDetails>({
      attributes: [
        "montering",
        "våning",
        "lift",
        "fasad",
        "kabel",
        "fjärrkontroll",
      ],
      values: ["", "", "nej", "", "", ""],
    });
  const [montering, setMontering] = useState<string>("");
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
      notes: notes,
      //installationDetails: installationDetails
    });
  }, [customerCart, customer, notes, installationDetails]);

  const handleInstalationDetailsUpdate = (attribute: string, value: string) => {
    const index = installationDetails.attributes?.lastIndexOf(attribute) || 0;
    const newArray = installationDetails.values || [];
    newArray[index] = value;
    setInstallationDetails((prev) => ({ ...prev, values: newArray }));
  };

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
    //handleInstalationDetailsUpdate("montering", montering);
    console.log(installationDetails);
  }, [installationDetails]);
  return (
    <>
      <Navbar title="Skapa Order" />
      <div className="flex min-h-screen flex-col items-center p-20 xl:px-60">
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
        <Accordion title={"Produkter"} applyHeight customOnClick primary>
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
        <Accordion title={"Anteckningar"} primary>
          <textarea
            id="anteckningar"
            className="bg-gray-100 w-full rounded-sm min-h-[160px]"
            value={notes}
            maxLength={2000}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          ></textarea>
        </Accordion>
        <Accordion title="Montering" primary>
          <form className="flex flex-col">
            <div>
              <label htmlFor="normal">
                <input
                  type="radio"
                  name="montering"
                  value="normal"
                  checked={montering === "normal"}
                  onChange={(e) => {
                    setMontering(e.target.value);
                    handleInstalationDetailsUpdate("montering", e.target.value);
                  }}
                />
                Normal
              </label>
              <label htmlFor="avancerad" className="ml-5">
                <input
                  type="radio"
                  name="montering"
                  value="avancerad"
                  checked={montering === "avancerad"}
                  onChange={(e) => {
                    setMontering(e.target.value);
                    handleInstalationDetailsUpdate("montering", e.target.value);
                  }}
                />
                Avancerad
              </label>
            </div>
            <div>
              <div>
                <label htmlFor="våning">Våning</label>
                <input
                  className="bg-gray-100 rounded-sm w-24"
                  type="text"
                  id="våning"
                  onChange={(e) => {
                    handleInstalationDetailsUpdate("våning", e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label>Lift?</label>
                <input
                  type="checkbox"
                  className="ml-2 w-4 h-4"
                  checked={lift}
                  onChange={(e) => {
                    setLift(e.target.checked);
                    handleInstalationDetailsUpdate(
                      "lift",
                      `${e.target.checked ? "ja" : "nej"}`
                    );
                  }}
                />
              </div>
            </div>
            {/* Are these defined choices below? */}
            <div>
              <label>Fasad</label>
              <input
                type="text"
                className="bg-gray-100 rounded-sm mx-3 w-24"
                onChange={(e) => {
                  handleInstalationDetailsUpdate("fasad", e.target.value);
                }}
              />

              {/* Are these defined choices below? */}

              <label>Kabel</label>
              <input
                type="text"
                className="bg-gray-100 rounded-sm mx-3 w-24"
                onChange={(e) => {
                  handleInstalationDetailsUpdate("kabel", e.target.value);
                }}
              ></input>

              <label>Fjärrkontroll</label>

              <select
                value={controller}
                onChange={(e) => {
                  setController(e.target.value);
                  handleInstalationDetailsUpdate(
                    "fjärrkontroll",
                    e.target.value
                  );
                }}
              >
                <option value="">Ingen</option>
                <option value="mono">Mono</option>
                <option value="lumero">Lumero</option>
                <option value="vario">Vario</option>
              </select>
            </div>
          </form>
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
