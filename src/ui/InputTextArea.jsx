import { useSelector } from "react-redux";
import { getIsDarkMode } from "./darkModeSlice";
import PropsTypes from "prop-types";
InputTextArea.propTypes = {
  context: PropsTypes.any,
  onSettingContext: PropsTypes.func,
};

function InputTextArea({ context, onSettingContext }) {
  const isDarkMode = useSelector(getIsDarkMode);

  return (
    <>
      <textarea
        value={context}
        onChange={onSettingContext}
        className={`outline-none resize-none min-h-10 min-h max-h-16 border p-1.5 rounded-md ${
          !isDarkMode
            ? "bg-slate-100 border-slate-300"
            : "bg-slate-500 border-slate-600"
        }`}
        placeholder="Write a post"
      ></textarea>
    </>
  );
}

export default InputTextArea;
