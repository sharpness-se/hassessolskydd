import React, { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface AccordionProps {
  title: string;
  addDelete?: boolean;
  children: ReactNode;
  applyHeight?: boolean;
  customOnClick?: boolean;
  deleteCallback?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  addDelete,
  children,
  deleteCallback,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded p-5 max-w-[44.5rem] ${
        title === "Typ av ärende" ? "w-[44.5rem]" : "w-full"
      }`}
    >
      <div
        onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold">
          {title}
        </h2>
        <div>
          {addDelete && (
            <button
              onClick={deleteCallback}
              className="bg-white h-min px-2 py-1 hover:bg-red-600 hover:text-white rounded text-xs font-bold mr-5 align-middle"
            >
              TA BORT
            </button>
          )}
          <button className="">
            {isExpanded ? (
              <FaChevronUp className="align-middle" />
            ) : (
              <FaChevronDown className="align-middle" />
            )}
          </button>
        </div>
      </div>
      {isExpanded && <div className={`mt-5`}>{children}</div>}
    </div>
  );
};

export default Accordion;
