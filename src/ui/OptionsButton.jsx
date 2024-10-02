import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OptionsButton({ onClick, className }) {
  return (
    <button className={` w-10 h-5 ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faEllipsis} className=" text-xl self-center" />
    </button>
  );
}

export default OptionsButton;
