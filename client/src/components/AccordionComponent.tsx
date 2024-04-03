import React, { ReactNode, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface AccordionProps {
  title: string;
  addDelete?: boolean;
  children?: ReactNode;
  applyHeight?: boolean;
  customOnClick?: boolean;
  deleteCallback?: () => void;
  primary?: boolean;
  disabled?: boolean;
  open?: boolean;
  itemIndex?: number;
  openIndex?: number;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  addDelete,
  children,
  deleteCallback,
  primary,
  disabled,
  open,
  openIndex,
  itemIndex
}) => {
  const [isExpanded, setIsExpanded] = useState(open || false);

  useEffect(() => {
    if (title === "Produkter") {
      console.log("trigger")
      setIsExpanded(true)
    }
    if (openIndex === itemIndex) {
      console.log(itemIndex)
      console.log(openIndex)
      setIsExpanded(true)
    }
  }, [open, title, openIndex, itemIndex])
  
  return (
    <div
      className={`bg-white rounded p-5 max-w-[44.5rem] ${
        primary ? "w-[44.5rem] mb-5" : "w-full"
      }`}
    >
      <div
        onClick={() =>
          primary && setIsExpanded((prevIsExpanded) => !prevIsExpanded)
        }
        className={`flex justify-between items-center ${primary && "cursor-pointer"}`}
      >
        <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold">
          {title}
        </h2>
        <div>
          {addDelete && (
            <button
              onClick={deleteCallback}
              disabled={disabled}
              className={`h-min px-2 py-1 ${!disabled ? "bg-white hover:bg-red-600 hover:text-white cursor-pointer" : "bg-gray-200"} rounded text-xs font-bold mr-5 align-middle`}
            >
              TA BORT
            </button>
          )}
          <button
            onClick={() =>
              !primary && setIsExpanded((prevIsExpanded) => !prevIsExpanded)
            }
            className="cursor-pointer"
          >
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
