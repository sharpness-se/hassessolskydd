import React from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return (
      <button
        className="items-center rounded-full bg-blue-600 shadow-md text-white text-xl font-bold px-12 py-3 hover:bg-blue-500"
        type="submit"
      >
        {label}
      </button>
  );
};

export default SubmitButton;
