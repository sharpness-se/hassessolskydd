import React from "react";

interface DoubleFieldInputRowProps {
  labelOne: string;
  labelTwo: string;
  placeholderOne: string;
  placeholderTwo: string;
}
const DoubleFieldInputRow: React.FC<DoubleFieldInputRowProps> = ({
  labelOne,
  labelTwo,
  placeholderOne,
  placeholderTwo,
}) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={labelOne}
        >
          {labelOne}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id={labelOne}
          type="text"
          placeholder={placeholderOne}
        />
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={labelTwo}
        >
          {labelTwo}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={labelTwo}
          type="text"
          placeholder={placeholderTwo}
        />
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      </div>
    </div>
  );
};

export default DoubleFieldInputRow;
