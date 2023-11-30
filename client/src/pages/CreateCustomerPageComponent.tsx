import React from "react";
import CreateCustomerComponent from "../components/CreateCustomerComponent";

export default function CreateCustomerPageComponent() {
  
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl bg-cyan-500 text-black border-black border-4 p-10 mb-11">
        Create Customer
      </h1>
      <CreateCustomerComponent/>
    </div>
  );
}
