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
}) => {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className={`${applyGrid ? "grid grid-cols-4 mr-1" : ""}`}>
        <fieldset disabled={disabled}>{children}</fieldset>
      </div>
      {!hideButtons && (
        <div className={`flex items-center justify-center`}>
          <BackButton
            text={backButtonText}
            onClick={customOnClickClear}
          ></BackButton>
          <SubmitButton label={submitButtonText} addToCart={addToCart} />
        </div>
      )}
      {hideButtons && (
        <>
          {!disabled && (
            <div className="flex w-full justify-evenly">
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
            </div>
          )}
          {disabled && (
            <div className="flex w-full justify-center">
              <button
                className="items-center rounded-full bg-blue-600 shadow-md text-white text-xl font-bold px-12 py-3 hover:bg-blue-500"
                type="button"
                onClick={() => {
                  if (customOnClick) customOnClick();
                }}
              >
                {submitButtonText}
              </button>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default FormComponent;
