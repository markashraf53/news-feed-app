import { useSelector } from "react-redux";
import { getIsDarkMode } from "../ui/darkModeSlice";
import PropTypes from "prop-types";
import CommentsList from "./CommentsList";
import CommentInputArea from "./CommentInputArea";

CommentSectionModal.propTypes = {
  className: PropTypes.string,
};

function CommentSectionModal({ className }) {
  const isDarkMode = useSelector(getIsDarkMode);

  return (
    <div
      className={`top-0 left-0 w-full h-auto flex items-center justify-center ${className}`}
    >
      <div
        className={` rounded-lg w-96 grid p-2 border ${
          isDarkMode
            ? "bg-slate-700 border-slate-800"
            : "bg-slate-200 border-slate-300"
        }`}
      >
        <CommentsList />
        <CommentInputArea />
      </div>
    </div>
  );
}

export default CommentSectionModal;
