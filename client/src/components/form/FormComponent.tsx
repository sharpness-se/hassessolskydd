import React, { ReactNode } from "react";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";

interface FormComponentProps {
  children?: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  applyGrid?: boolean;
  backButtonText: string;
  submitButtonText: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  children,
  applyGrid,
  onSubmit,
  backButtonText,
  submitButtonText
}) => {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className={`${applyGrid ? "grid grid-cols-4 mr-1" : ""}`}>
        {children}
      </div>
      <div className="flex items-center justify-center">
        <BackButton text={backButtonText} />
        <SubmitButton label={submitButtonText} />
      </div>
    </form>
  );
};

export default FormComponent;
