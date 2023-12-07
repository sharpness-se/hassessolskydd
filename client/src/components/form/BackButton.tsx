import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
    return (
        <Link to={'/'} className="mr-4">Tillbaka</Link>
    );
  };
  
  export default BackButton;