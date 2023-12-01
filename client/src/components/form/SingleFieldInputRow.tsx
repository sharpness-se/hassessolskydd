import React from "react";

interface SingleFieldInputRowProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number
  id: string;
}

const SingleFieldInputRow: React.FC<SingleFieldInputRowProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  id
}) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${value.length===0?"border-red-500":""} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
        {error && <p className="text-red-500 text-xs italic">{error} </p>}
      </div>
    </div>
  );
};

export default SingleFieldInputRow;
