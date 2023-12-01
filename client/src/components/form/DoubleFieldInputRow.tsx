import React, { ReactNode } from "react";

interface DoubleFieldInputRowProps {
  labelOne: string;
  labelTwo: string;
  placeholderOne?: string;
  placeholderTwo?: string;
  children?: ReactNode;
  onChangeOne: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTwo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorOne: string;
  errorTwo: string;
  valueOne: string;
  valueTwo: string;
  maxLengthOne: number;
  maxLengthTwo: number;
  idOne: string;
  idTwo: string;
}
const DoubleFieldInputRow: React.FC<DoubleFieldInputRowProps> = ({
  labelOne,
  labelTwo,
  idOne,
  idTwo,
  placeholderOne,
  placeholderTwo,
  valueOne,
  valueTwo,
  onChangeOne,
  onChangeTwo,
  errorOne,
  errorTwo,
  maxLengthOne,
  maxLengthTwo,

}) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={idOne}
        >
          {labelOne}
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${valueOne.length===0?"border-red-500":""} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={idOne}
          autoComplete={labelOne}
          type="text"
          placeholder={placeholderOne}
          value={valueOne}
          onChange={onChangeOne}
          maxLength={maxLengthOne}
        />
        {errorOne && <p className="text-red-500 text-xs italic">{errorOne} </p>}
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={idTwo}
        >
          {labelTwo}
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${valueTwo.length===0?"border-red-500":""} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id={idTwo}
          type="text"
          placeholder={placeholderTwo}
          value={valueTwo}
          onChange={onChangeTwo}
          maxLength={maxLengthTwo}
        />
        {errorTwo && <p className="text-red-500 text-xs italic">{errorTwo} </p>}
      </div>
    </div>
  );
};

export default DoubleFieldInputRow;
