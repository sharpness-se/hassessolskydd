import React, { useEffect, useState } from 'react';

import MuiSearchBarComponent, {
  Customer,
} from '../components/searchBar/MuiSearchBarComponent';
import CustomerDetailsComponent from '../components/CustomerDetailsComponent';
import ContactDateComponent from '../components/ContactDateComponent';
import Accordion from '../components/AccordionComponent';
import { baseUrl } from '../settings/baseUrl';
import CustomerCartComponent from '../components/cart/CustomerCartComponent';

import toast, { Toaster } from 'react-hot-toast';
import Pilsegardin from '../components/createOrderProductForms/Pilsegardin';
import Navbar from '../components/NavbarComponent';

export interface Product {
  name: string;
  attributes: string[];
  values: string[];
}
export interface InstallationDetails {
  isNormal?: String;
  facadeDetails?: String;
  floorDetails?: String;
  cableLength?: String;
  remoteControl?: String;
  needLift?: String;
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
  const [product, setProduct] = useState('');
  const [customerCart, setCustomerCart] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>();
  const [notes, setNotes] = useState<string>('');
  const [controller, setController] = useState<string>('');
  const [lift, setLift] = useState<boolean>(false);
  const [montering, setMontering] = useState<string>('');
  const [installationDetails, setInstallationDetails] =
    useState<InstallationDetails>({
      isNormal: undefined,
      facadeDetails: undefined,
      floorDetails: undefined,
      cableLength: undefined,
      remoteControl: undefined,
      needLift: "no",
    });
  
  useEffect(() => {
    const prepareUrl = () => {
      const url = `${baseUrl}/api/customers`;
      return encodeURI(url);
    };

    const fetchData: () => Promise<void> = async () => {
      try {
        const response = await fetch(prepareUrl(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 204) {
          console.log('No Customers Found!');
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
    setInstallationDetails((prev)=>({...prev, [attribute]: value}))
  };

  const handleSubmit = async () => {
    console.log('Updated formData:', formData);
    if (!formData?.customerNumber) {
      toast.error('Please Select a Customer!');
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Order Submitted Successfully!');
        const data = await response.json();
        console.log(data);
        setNotes('');
      }
      if (!response.ok) {
        toast.error(`Something went wrong! Status: ${response.status}`);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };
  // useEffect(() => {
  //   //handleInstalationDetailsUpdate("montering", montering);
  //   console.log(installationDetails);
  // }, [installationDetails]);
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
            <ContactDateComponent heading={'Datum'} />
          </div>
          <div className="flex-2">
            <CustomerDetailsComponent customer={customer} />
          </div>
        </div>
        <Accordion title={'Produkter'} applyHeight customOnClick primary>
          {hidden && (
            <div className={'w-full'}>
              <label
                htmlFor="mySelect"
                className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              >
                Välj en produkt:
              </label>
              <br />
              <select
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
                <option value="Pilsegardin">Pilsegardin</option>
              </select>
            </div>
          )}
          {!hidden && product === 'Pilsegardin' && (
            <Pilsegardin
              product={product}
              clearOnClick={() => {
                setHidden(true);
                setProduct('');
              }}
              cartCallback={setCustomerCart}
            />
          )}
        </Accordion>
        <Accordion title={'Anteckningar'} primary>
          <textarea
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
                    checked={montering === 'normal'}
                    onChange={(e) => {
                      setMontering(e.target.value);
                      handleInstalationDetailsUpdate(
                        'isNormal',
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
                    checked={montering === 'advanced'}
                    onChange={(e) => {
                      setMontering(e.target.value);
                      handleInstalationDetailsUpdate(
                        'isNormal',
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

            {/* Are these defined choices below? */}
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
                  onChange={(e) => {
                    handleInstalationDetailsUpdate('floorDetails', e.target.value);
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
                  className="appearance-none w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) => {
                    handleInstalationDetailsUpdate('facadeDetails', e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex w-full space-x-5 mb-3">
              {/* Are these defined choices below? */}
              <div className="w-full">
                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                  Kabel
                </label>
                <br />
                <input
                  type="text"
                  className="appearance-none w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) => {
                    handleInstalationDetailsUpdate('cableLength', e.target.value);
                  }}
                ></input>
              </div>

              <div className="w-full">
                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                  Fjärrkontroll
                </label>
                <br />
                <select
                  className="w-full text-gray-700 border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                  value={controller}
                  onChange={(e) => {
                    setController(e.target.value);
                    handleInstalationDetailsUpdate(
                      'remoteControl',
                      e.target.value,
                    );
                  }}
                >
                  <option value="">Ingen</option>
                  <option value="mono">Mono</option>
                  <option value="lumero">Lumero</option>
                  <option value="vario">Vario</option>
                </select>
              </div>
            </div>

            <div className="flex items-center ps-4 border border-gray-200 rounded-lg">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                checked={lift}
                onChange={(e) => {
                  setLift(e.target.checked);
                  handleInstalationDetailsUpdate(
                    'needLift',
                    `${e.target.checked ? 'yes' : 'no'}`,
                  );
                }}
              />
              <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                Behövs lift?
              </label>
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
