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
  addToCart?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  children,
  applyGrid,
  onSubmit,
  backButtonText,
  submitButtonText,
  customOnClickClear,
  addToCart
}) => {
  
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className={`${applyGrid ? "grid grid-cols-4 mr-1" : ""}`}>
        {children}
      </div>
      <div className="flex items-center justify-center">
        <BackButton text={backButtonText} onClick={customOnClickClear}/>
        <SubmitButton label={submitButtonText} addToCart={addToCart} />
      </div>
    </form>
  );
};

export default FormComponent;
