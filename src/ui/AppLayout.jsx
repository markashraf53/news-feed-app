import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "./darkModeSlice";
import AuthDetails from "../user/auth/AuthDetails";

function AppLayout() {
  const isDarkMode = useSelector(getIsDarkMode);
  return (
    <div
      className={`h-full w-full font-[Outfit] pb-10 ${
        !isDarkMode
          ? "bg-slate-100 text-slate-700"
          : "bg-slate-900 text-slate-300"
      }`}
    >
      <NavBar />
      <div className="fixed grid w-full pt-24 pr-1 z-0 pointer-events-none">
        <AuthDetails />
      </div>
      <div className="pt-28">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
