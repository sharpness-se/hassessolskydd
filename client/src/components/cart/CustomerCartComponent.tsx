import React, { ReactNode } from "react";
import StartMenuButton from "../StartMenuButtonComponent";
import Accordion from "../AccordionComponent";

interface CustomerCartProps {
  children?: ReactNode;
}
const CustomerCartComponent: React.FC<CustomerCartProps> = ({ children }) => {
  return (
    <div className="bg-white rounded p-5 max-w-3xl w-[715px] mt-5">
      <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold mb-1 pb-2">
        Kundkorg:
      </h2>
      <div className="flex flex-col">
        <div className="grid-cols-{4} bg-gray-300 w-full h-88 overflow-y-auto flex-row px-10 py-5 rounded">
          <div>{children}</div>
        </div>
        <div className="flex w-full justify-center">
          <StartMenuButton text={"Submit Order"} />
        </div>
      </div>
    </div>
  );
};

export default CustomerCartComponent;
