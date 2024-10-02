import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SocialButton({ icon, children, onClick, disabled, className, textColor }) {
  return (
    <button className={`flex items-center gap-1.5 ${textColor} ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} disabled={disabled} className={`${className}`}/>
      {children}
    </button>
  );
}

export default SocialButton;
