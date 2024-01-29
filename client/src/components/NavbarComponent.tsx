import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaBars, FaX } from "react-icons/fa6";

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
      <nav className="bg-blue-500 p-5 text-white sticky top-0 w-full flex items-center justify-between z-50">
        <Link to={"/"}>
          <div className="flex items-center">
            <FaAngleLeft className="align-middle" />
            <p>Tillbaka</p>
          </div>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaX size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </nav>

      <div
        className={`bg-blue-600 w-full lg:w-80 h-full fixed right-0 z-40 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="text-white font-bold text-xl">
          <li className="p-5 shadow-sm">
            <Link to={"/skapakund"}>Skapa ny kund</Link>
          </li>
          <li className="p-5 shadow-sm">
            <Link to={"/skapaorder"}>Skapa order</Link>
          </li>
          <li className="p-5 shadow-sm">
            <Link to={"/"}>Se kunder</Link>
          </li>
          <li className="p-5 shadow-sm">
            <Link to={"/"}>Se ordrar</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
