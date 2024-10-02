import { useSelector } from "react-redux";
import { getIsDarkMode } from "./darkModeSlice";

function Loader() {
  const isDarkMode = useSelector(getIsDarkMode);
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`animate-spin rounded-full h-16 w-16 border-t-4 ${
          isDarkMode ? "border-slate-300" : "border-slate-600"
        }  border-solid`}
      ></div>
    </div>
  );
}

export default Loader;
