import React from "react";

interface SubmitButtonProps {
  label: string;
  addToCart?: () => void;
  customOnClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  addToCart,
  customOnClick,
}) => {
  const renderButton = () => {
    if (addToCart) {
      return (
        <button
          className="items-center rounded-full bg-blue-600 shadow-md text-white text-xl font-bold px-12 py-3 hover:bg-blue-500"
          type="submit"
        >
          {label}
        </button>
      );
    }

    return (
      <button
        className="items-center rounded-full bg-blue-600 shadow-md text-white text-xl font-bold px-12 py-3 hover:bg-blue-500"
        type="button"
      >
        {label}
      </button>
    );
  };
  return renderButton();
};

export default SubmitButton;
