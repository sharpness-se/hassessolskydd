import React from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return (
    <div className="flex w-full px-3 justify-center">
      <button
        className="items-center rounded-full bg-blue-600 shadow-xl text-white text-xl font-bold px-12 py-3 hover:bg-blue-500"
        type="submit"
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
