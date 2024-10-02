import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function NavButton({ children, icon, onClick, path }) {
  return (
    <li>
      <div className="tooltip">
        <span className="tooltiptext">{children}</span>
        {path ? (
          <NavLink to={path}>
            <FontAwesomeIcon className="text-4xl" icon={icon} />
          </NavLink>
        ) : (
          <button className="text-4xl" onClick={onClick}>
            <FontAwesomeIcon className="text-4xl" icon={icon} />
          </button>
        )}
      </div>
    </li>
  );
}

export default NavButton;
