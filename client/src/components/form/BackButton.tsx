import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
    return (
        <Link to={'/'} className="mr-4">
            <button className="rounded-full bg-gray-100 hover:bg-gray-50 shadow-md text-xl font-bold px-12 py-3">
                Tillbaka
            </button>
        </Link>
    );
  };
  
  export default BackButton;