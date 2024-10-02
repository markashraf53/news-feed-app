import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const SmallLoader = ({ children }) => {
  return (
    <div className="flex justify-center items-center text-center h-32 w-auto pb-4">
      <div
        className="animate__animated animate__pulse animate__infinite animate__faster rounded-full text-lg 
       border-gray-900 text-slate-600"
      >
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="animate-spin h-10 w-10 rounded-full"
        />
        <p className="-ml-2">{children}</p>
      </div>
    </div>
  );
};

SmallLoader.propTypes = {
  children: PropTypes.any,
};

export default SmallLoader;
