import {
  faBell,
  faHouse,
  faMoon,
  faSun,
  faUser,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { getIsDarkMode, toggleDarkMode } from "./darkModeSlice";
import NavButton from "./NavButton";
import { getAuthUserInfo, getIsSignedIn } from "../user/userSlice";
import SearchBar from "./Search/SearchBar";
import { SearchContextProvider } from "../contexts/SearchContext";
import NotificationDropDown from "./notifications/notificationDropDown";
import { useState } from "react";

function NavBar() {
  const isDarkMode = useSelector(getIsDarkMode);
  const isSignedIn = useSelector(getIsSignedIn);
  const authUser = useSelector(getAuthUserInfo);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);

  function toggleShowNotification() {
    setShowNotification((showNotification) => !showNotification)
  }

  return (
    <div
      className={`fixed z-20 h-24 w-full md:mx-2 items-center mb-5 border-y-2 border-gray-400/25 ${
        !isDarkMode ? "bg-slate-300/50" : "bg-slate-600/50"
      }  ${
        !isSignedIn
          ? "flex items-center justify-center"
          : "grid grid-cols-3 justify-center"
      }`}
    >
      {isSignedIn && (
        <SearchContextProvider>
          <SearchBar className="justify-self-center self-center" />
        </SearchContextProvider>
      )}
      <nav>
        <ul className="flex gap-16 sm:gap-20 md:gap-28 justify-self-center">
          <NavButton icon={faHouse} path="/">
            Home
          </NavButton>
          {isSignedIn ? (
            <>
              <NavButton icon={faUser} path={`/profile/${authUser?.uid}`}>
                Profile
              </NavButton>
              <NavButton
                icon={faBell}
                path="/notifications"
                onClick={toggleShowNotification}
                
              >
                Notifications
              </NavButton>
              {showNotification && <NotificationDropDown />}
            </>
          ) : (
            <NavButton icon={faUserLock} path="/sign-in">
              Login
            </NavButton>
          )}

          <NavButton
            onClick={() => dispatch(toggleDarkMode())}
            icon={!isDarkMode ? faMoon : faSun}
          >
            {!isDarkMode ? "Dark Mode" : "Light Mode"}
          </NavButton>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
