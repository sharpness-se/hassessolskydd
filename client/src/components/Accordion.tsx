import React, { ReactNode, useState } from "react";

interface AccordionProps {
    title: string;
    children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  return (
      <div className="bg-white rounded p-5 w-full">
          <div>
              <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold mb-3">
                  {title}
               </h2>
               <button>
                v
               </button>
          </div>  
      </div>
    );
}

export default Accordion;