import React, { ReactNode } from "react";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";

interface FormComponentProps {
  children?: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  applyGrid?: boolean;
  backButtonText: string;
  submitButtonText: string;
  customOnClickClear?: () => void;
  customOnClick?: () => void;
  addToCart?: () => void;
  disabled?: boolean;
  hideButtons?: boolean;
  handleUpdateCustomer?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  children,
  applyGrid,
  onSubmit,
  backButtonText,
  submitButtonText,
  customOnClickClear,
  customOnClick,
  addToCart,
  disabled,
  hideButtons,
  handleUpdateCustomer,
}) => {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className={`${applyGrid ? "grid grid-cols-4 mr-1" : ""}`}>
        <fieldset disabled={disabled}>{children}</fieldset>
      </div>
      <div
        className={`flex items-center justify-center ${hideButtons ? "hidden" : ""}`}
      >
        <SubmitButton label={submitButtonText} addToCart={addToCart} />
      </div>
      {hideButtons && (
        <>
          {!disabled && (
            <>
              <BackButton
                text={"Avbryta"}
                onClick={() => {
                  if (customOnClickClear) {
                    customOnClickClear();
                  }
                }}
              ></BackButton>

              <button
                className="items-center rounded-full bg-blue-600 shadow-md text-white text-xl font-bold px-12 py-3 hover:bg-blue-500"
                type="submit"
              >
                Spara
              </button>
            </>
          )}
          {disabled && (
            
            <button
              className="items-center rounded-full bg-blue-600 shadow-md text-white text-xl font-bold px-12 py-3 hover:bg-blue-500"
              type="button"
              onClick={() => {
                if (customOnClick) customOnClick();
              }}
            >
              {submitButtonText}
            </button>
          )}
        </>
      )}
    </form>
  );
};

export default FormComponent;
