import React from "react";
import { Link } from "react-router-dom";

interface StartMenuButtonProps {
  text: string;
  href?: string;
}

const StartMenuButton: React.FC<StartMenuButtonProps> = ({ text, href }) => {
  return (
    <Link
      to={href? href: ""}
      className="flex justify-center items-center rounded-full bg-white hover:bg-blue-600 shadow-xl hover:text-white text-2xl w-[331px] h-[70px] m-5"
    >
      {text}
    </Link>
  );
};

export default StartMenuButton;
