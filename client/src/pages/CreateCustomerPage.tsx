import React from "react";
import CreateCustomerComponent from "../components/CreateCustomerComponent";
import Navbar from "../components/NavbarComponent";

export default function CreateCustomerPageComponent() {
  return (
    <>
      <Navbar title="Skapa ny kund" />
      <div className="flex min-h-screen flex-col items-center p-24 ">
        <CreateCustomerComponent />
      </div>
    </>
  );
}
