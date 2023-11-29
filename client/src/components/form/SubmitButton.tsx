import React from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return (
    <div className="flex w-full px-3 justify-center">
      <button
        className="items-center rounded-full bg-white hover:bg-blue-600 shadow-xl hover:text-white text-xl w-[25vw] h-[40px]"
        type="submit"
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
