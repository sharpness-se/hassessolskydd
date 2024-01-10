import React, { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded p-5 mx-5 max-w-3xl w-[715px]">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
      >
        <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold">
          {title}
        </h2>
        <button>
          {isExpanded ? (
            <FaChevronUp className="align-middle" />
          ) : (
            <FaChevronDown className="align-middle" />
          )}
        </button>
      </div>
      {isExpanded && <div className="mt-5">{children}</div>}
    </div>
  );
};

export default Accordion;
