import React from "react";
import Navbar from "../components/NavbarComponent";

export default function SearchOrderPage() {
  return (
    <>
      <Navbar title="Sök ordrar" />
      <div className="flex min-h-screen flex-col items-center p-20 xl:px">
        {/* <h1 data-test="search-heading" className="text-5xl mb-11 min-w-max">
        Sök Ordrar
      </h1> */}
        <div className="w-full rounded-lg p-10 bg-white shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-3">Sök Ordrar</h2>
        </div>
      </div>
    </>
  );
}
