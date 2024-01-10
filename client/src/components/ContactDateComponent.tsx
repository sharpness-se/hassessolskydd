import React, { useState } from "react";

interface ContactDateProps {
  heading: string;
}

const ContactDateComponent: React.FC<ContactDateProps> = ({ heading }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return (
    <div className="bg-white rounded p-5 w-full">
      <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold mb-1">
        {heading}
      </h2>
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">
        Kontakt
      </p>
      <p>{currentDate.toLocaleDateString()}</p>
    </div>
  );
};

export default ContactDateComponent;
