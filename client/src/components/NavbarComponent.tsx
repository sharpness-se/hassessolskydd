import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-blue-500 p-5 text-white fixed top-0 w-full flex justify-between z-50">
        <Link to={"/"}>
          <p>Tillbaka</p>
        </Link>
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={toggleMenu}>
          {isMenuOpen ? <FaX /> : <FaBars />}
        </button>
      </nav>

      <div
        className={`bg-blue-600 w-80 h-full p-5 fixed top-16 right-0 z-0 transition-all ${
          isMenuOpen
            ? "block transition-transform ease-out duration-300 transform translate-x-0"
            : "hidden transform translate-x-full"
        }`}
      >
        <ul>
          <li>
            <Link to={"/skapakund"}>Skapa ny kund</Link>
            <Link to={"/skapaorder"}>Skapa order</Link>
            <Link to={"/"}>Se kunder</Link>
            <Link to={"/"}>Se ordrar</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
