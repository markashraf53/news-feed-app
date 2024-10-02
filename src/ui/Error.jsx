import PropTypes from "prop-types";

Error.propTypes = {
  msg: PropTypes.string,
};

function Error({ msg }) {
  return <p className="justify-self-end pr-1 text-sm text-red-500">{msg}</p>;
}

export default Error;
