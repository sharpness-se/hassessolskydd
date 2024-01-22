import React from "react";
import { Link } from "react-router-dom";

interface StartMenuButtonProps {
  text: string;
  href?: string;
  handleSubmit?: () => Promise<void>;
}

const StartMenuButton: React.FC<StartMenuButtonProps> = ({
  text,
  href,
  handleSubmit,
}) => {
  const styling =
    "flex justify-center items-center rounded-full bg-white hover:bg-blue-600 shadow-xl hover:text-white text-2xl w-[331px] h-[70px] m-5";

  const renderbutton = () => {
    if (handleSubmit) {
     
        return <button className={`${styling}`} onClick={() => handleSubmit()}>
          {text}
        </button>
    
    } else {
      return (
        <Link to={href ? href : ""} className={`${styling}`}>
          {text}
        </Link>
      );
    }
  };
  return renderbutton();
};

export default StartMenuButton;
