import React from "react";
import SearchBar from "../components/CustomSearchComponent";

export default function CreateOrderPageComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-5xl mb-11">Skapa Order</h1>
      <SearchBar />
    </div>
  );
}
