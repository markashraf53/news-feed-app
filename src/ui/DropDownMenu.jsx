import { useState } from "react";
import OptionsButton from "./optionsButton";
import PropTypes from "prop-types";

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-20">
      <OptionsButton
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium outline-none transition duration-150 ease-in-out"
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right bg-slate-100 divide-y divide-gray-100 rounded-md shadow-lg animate-fade-in">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.any,
};

export default DropdownMenu;
