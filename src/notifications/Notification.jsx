import useGetUserDetails from "../user/hooks/useGetUserDetails";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Notification.propTypes = {
  notification: PropTypes.object,
};

function Notification({ notification }) {
  const { notificationType, reactorId, postId } = notification;
  const { userInfo: reactorInfo } = useGetUserDetails(reactorId);

  return (
    <Link to={`/post/${postId}`}>
      <div className="flex gap-3.5 my-2 border-2 border-blue-200 rounded-lg p-2">
        <img
          src={reactorInfo?.avatarUrl}
          className="h-14 w-14 rounded-full object-cover"
        ></img>
        <div className="flex gap-2">
          <p className="text-lg font-semibold self-center">
            {reactorInfo?.displayName}
          </p>
          {notificationType === "comment" ? (
            <p className="self-center">{`${notificationType}ed on your post`}</p>
          ) : (
            <p className="self-center">{`${notificationType}d your post`}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Notification;
