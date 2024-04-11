import React, { useEffect, useState } from "react";
import hassessolskyddLogo from "../images/logo.png";
import StartMenuButton from "../components/StartMenuButtonComponent";
import { useAuth0 } from "@auth0/auth0-react";

export default function StartPageComponent() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.name || "");
    }
    if (user) {
      console.log(user);
    }
    if (isAuthenticated) {
      console.log(isAuthenticated)
    }
    
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <img src={hassessolskyddLogo} alt={"Hassessolskydd Logo"}></img>
      <h2 className="p-20 text-[36px]">{`Välkommen, ${userName}!`}</h2>
      <StartMenuButton text="Skapa ny kund" href="/skapakund"></StartMenuButton>
      <StartMenuButton text="Skapa order" href="/skapaorder"></StartMenuButton>
      <StartMenuButton text="Se kunder" href=""></StartMenuButton>
      <StartMenuButton text="Se ordrar" href="/seordrar"></StartMenuButton>
    </main>
  );
}
