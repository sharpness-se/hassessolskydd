import React from "react";
import SearchBar from "../components/CustomSearchComponent";

export default function CreateOrderPageComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl mb-11">Skapa Order</h1>
      <div className="flex">
        <div className="flex flex-col flex-grow">
          <div className="bg-white p-5 rounded w-full mb-5">
            <SearchBar />
          </div>
          <div className="bg-white rounded p-5 w-full">
            <h2 className="uppercase tracking-wide text-gray-700 text-xs font-bold">Typ av ärende</h2>
          </div>
        </div>
        <div className="bg-white rounded p-5 flex-grow h-auto ml-5 w-60">
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">Telefonnummer</p>
          <p>-</p>
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">Adress</p>
          <p>-</p>
          <p className="uppercase tracking-wide text-gray-700 text-xs font-bold">E-post</p>
          <p>-</p>
        </div>
      </div>
    </div>
  );
}
