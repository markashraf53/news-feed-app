import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../../user/userSlice";
import { getIsDarkMode } from "../darkModeSlice";

SearchBarUserDisplay.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func,
};

function SearchBarUserDisplay({ user, onClick }) {
  const authUser = useSelector(getAuthUserInfo);
  const isDarkMode = useSelector(getIsDarkMode);

  return (
    <NavLink
      onClick={onClick}
      to={`/profile/${user.uid}`}
      className={`flex gap-3 items-center px-3 py-2 ${
        isDarkMode ? "hover:bg-slate-400" : "hover:bg-slate-200"
      } `}
    >
      <img src={user.avatarUrl} className="w-10 h-10 rounded-full"></img>
      <p>
        {authUser.uid === user.uid
          ? `${user.displayName} (you)`
          : user.displayName}
      </p>
    </NavLink>
  );
}

export default SearchBarUserDisplay;
