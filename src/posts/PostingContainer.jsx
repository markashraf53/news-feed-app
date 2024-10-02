import { useSelector } from "react-redux";
import { getIsDarkMode } from "../ui/darkModeSlice";
import PropsTypes from "prop-types";
PostingContainer.propTypes = {
  children: PropsTypes.any,
};

function PostingContainer({ children }) {
  const isDarkMode = useSelector(getIsDarkMode);
  return (
    <div
      className={`${
        !isDarkMode
          ? "bg-slate-200 border-slate-300 text-slate-700"
          : "bg-slate-700 border-slate-800 text-slate-200"
      }  rounded-md border w-96 max-h-48 h-auto grid mb-5 p-1.5`}
    >
      {children}
    </div>
  );
}

export default PostingContainer;
