import React, { ReactNode } from "react";
import SubmitButton from "./SubmitButton";


interface FormComponentProps {
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FormComponent: React.FC<FormComponentProps> = ({ children, onSubmit }) => {

  return (
    
      <form onSubmit={onSubmit}
        className="w-full max-w-lg rounded-lg p-10 bg-white shadow-md"
        
      >
        {children}
        <SubmitButton label="Spara" />
      </form>

  );
};

export default FormComponent;
