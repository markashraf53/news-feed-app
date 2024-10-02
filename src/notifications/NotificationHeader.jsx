import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

NotificationHeader.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
};

function NotificationHeader({ icon, title }) {
  return (
    <div className="flex gap-4 text-2xl mb-4">
      <FontAwesomeIcon icon={icon} className="self-center" />
      <p className="self-center font-medium">{title}</p>
    </div>
  );
}

export default NotificationHeader;
