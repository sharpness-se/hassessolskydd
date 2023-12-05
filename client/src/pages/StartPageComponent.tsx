import React from "react";
import hassessolskyddLogo from "../images/logo.png";
import StartMenuButton from "../components/StartMenuButton";

export default function StartPageComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <img src={hassessolskyddLogo} alt={"Hassessolskydd Logo"}></img>
      <h2 className="p-20 text-[36px]">Välkommen, Hasse!</h2>
      <StartMenuButton text="Skapa ny kund" href="/skapakund"></StartMenuButton>
      <StartMenuButton text="Skapa order" href="/skapaorder"></StartMenuButton>
      <StartMenuButton text="Se kunder" href=""></StartMenuButton>
      <StartMenuButton text="Se ordrar" href=""></StartMenuButton>
    </main>
  );
}
