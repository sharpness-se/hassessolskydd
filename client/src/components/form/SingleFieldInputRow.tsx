import React from "react";

interface SingleFieldInputRowProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number
  id: string;
  applyGrid?: boolean;
}

const SingleFieldInputRow: React.FC<SingleFieldInputRowProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  id,
  applyGrid
}) => {
  return (
    <div className={`flex flex-wrap ${applyGrid? "":"-mx-3"} mb-6`}>
      <div className={` px-3 ${applyGrid ? "flex flex-col": "w-full"}`}>
        <label
          className={`${applyGrid? "": "block"} uppercase tracking-wide text-gray-700 text-xs font-bold mb-1`}
          htmlFor={id}
        >
          {label}*
        </label>
        <input
          className={`appearance-none text-gray-700 border ${applyGrid? "w-36": "block w-full"} ${error?"border-red-500" : "border-gray-200"} shadow-md rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          autoComplete="off"
        />
        {error && <p className="text-red-500 text-xs italic">{error} </p>}
      </div>
    </div>
  );
};

export default SingleFieldInputRow;
