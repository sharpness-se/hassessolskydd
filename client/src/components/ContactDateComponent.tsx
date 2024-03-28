import React, { useEffect, useState } from "react";
import { baseUrl } from "../settings/baseUrl";
import { useParams } from "react-router-dom";

interface ContactDateProps {
  heading: string;
}

interface OrderDates {
  firstContact: Date;
  installationDate?: Date;
  measurementDate?: Date;
}

const ContactDateComponent: React.FC<ContactDateProps> = ({ heading }) => {
  const [contact, setContact] = useState<Date>(new Date());
  const { id } = useParams();
  const [orderDates, setOrderDates] = useState<OrderDates>({
    firstContact: new Date(),
    installationDate: new Date(),
    measurementDate: new Date(),
  });

  useEffect(() => {
    const prepareUrl = () => {
      const url = `${baseUrl}/api/order/${id}`;
      return encodeURI(url);
    };
    const fetchData: () => Promise<void> = async () => {
      if (id) {
        try {
          const response = await fetch(prepareUrl(), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 204) {
            console.log("No Order Found!");
          } else {
            const data = await response.json();
            const { firstContact, measurementDate, installationDate } = data;
            const dates = {
              firstContact: new Date(firstContact),
              installationDate: new Date(installationDate),
              measurementDate: new Date(measurementDate),
            };
            setOrderDates(dates);

            setContact(new Date(data.firstContact));
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded p-5 w-full pb-11">
      <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold mb-1">
        {heading}
      </h2>
      <div className="flex w-full justify-between">
        <div>
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">
            Kontakt
          </p>
          <p>{contact.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">
            Mätning
          </p>
          <p>{orderDates.measurementDate?.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">
            Montering
          </p>
          <p>{orderDates.installationDate?.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDateComponent;
