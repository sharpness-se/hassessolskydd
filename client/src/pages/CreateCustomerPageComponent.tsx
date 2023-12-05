import React from "react";
import CreateCustomerComponent from "../components/CreateCustomerComponent";

export default function CreateCustomerPageComponent() {
  
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl mb-11">
        Skapa ny kund
      </h1>
      <CreateCustomerComponent/>
    </div>
  );
}
