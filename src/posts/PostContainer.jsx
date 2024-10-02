import { useSelector } from "react-redux";
import { getIsDarkMode } from "../ui/darkModeSlice";
import PropTypes from "prop-types";

PostContainer.propTypes = {
  children: PropTypes.any,
};

function PostContainer({ children }) {
  const isDarkMode = useSelector(getIsDarkMode);

  return (
    <div
      className={`${
        !isDarkMode
          ? " bg-slate-200 border-slate-300"
          : "bg-slate-700 border-slate-800"
      }  rounded-md border w-96`}
    >
      {children}
    </div>
  );
}

export default PostContainer;
