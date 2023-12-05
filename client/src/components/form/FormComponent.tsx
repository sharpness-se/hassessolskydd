import React, { ReactNode } from "react";
import SubmitButton from "./SubmitButton";


interface FormComponentProps {
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FormComponent: React.FC<FormComponentProps> = ({ children, onSubmit }) => {

  return (
    
      <form onSubmit={onSubmit}
        className="w-full max-w-lg border-2 border-black rounded-xl p-10"
        
      >
        {children}
        <SubmitButton label="Spara" />
      </form>

  );
};

export default FormComponent;
