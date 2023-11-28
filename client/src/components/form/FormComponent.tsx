import React, { ReactNode } from "react";

const FormComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <form className="w-full max-w-lg border-2 border-black rounded-xl p-10">
      {children}
    </form>
  );
};

export default FormComponent;
