import React from "react";
import CreateCustomerComponent from "../components/CreateCustomerComponent";
import Navbar from "../components/NavbarComponent";

export default function CreateCustomerPageComponent() {
  return (
    <>
      <Navbar title="Skapa ny kund" />
      <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className="w-full max-w-lg rounded-lg p-10 bg-white shadow-md">
          <CreateCustomerComponent />
          </div>
      </div>
    </>
  );
}
