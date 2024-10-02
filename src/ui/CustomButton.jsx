import PropsTypes from "prop-types";
CustomButton.propTypes = {
  children: PropsTypes.any,
  onClick: PropsTypes.func,
};

function CustomButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-400/50 justify-self-end hover:bg-blue-400 rounded-md w-20 h-9 mt-2"
    >
      {children}
    </button>
  );
}

export default CustomButton;
