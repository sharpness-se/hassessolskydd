import React, { ReactNode } from "react";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";


interface FormComponentProps {
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FormComponent: React.FC<FormComponentProps> = ({ children, onSubmit }) => {

  return (
    
      <form onSubmit={onSubmit}>
        {children}
        <div className="flex items-center justify-center">
          <BackButton />
          <SubmitButton label="Spara" />
        </div>
      </form>

  );
};

export default FormComponent;
