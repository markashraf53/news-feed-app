import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../user/userSlice";
import { dateFormaterFn } from "../helpers/dateFormaterFn";
import FriendRequestResponseButtons from "./FriendRequestResponseButtons";
import FriendRequestSenderInfo from "./FriendRequestSenderInfo";
import useGetRequestInfo from "./hooks/useGetRequestInfo";
import useAcceptFriendRequest from "./hooks/useAcceptFriendRequest";
import useRejectFriendRequest from "./hooks/useRejectFriendRequest";
import PropTypes from "prop-types";

FriendRequestTemplate.propTypes = {
  senderEmail: PropTypes.string.isRequired,
  timestamp: PropTypes.any,
  senderId: PropTypes.string.isRequired,
};

function FriendRequestTemplate({ senderEmail, timestamp, senderId }) {
  const userInfo = useSelector(getAuthUserInfo);
  const senderInfo = useGetRequestInfo(senderId);
  const formattedDate = dateFormaterFn(timestamp);

  //useAcceptFriendRequest custom hook returns a mutateAsync function that is used to handle accepting friend request
  const acceptFriend = useAcceptFriendRequest(
    userInfo?.uid,
    userInfo?.email,
    senderId,
    senderEmail
  );

  //useAcceptFriendRequest custom hook returns a mutateAsync function that is used to handle rejecting friend request
  const rejectFriend = useRejectFriendRequest(
    userInfo?.uid,
    userInfo?.email,
    senderId,
    senderEmail
  );

  function handleAcceptRequest() {
    acceptFriend();
  }

  function handleRejectRequest() {
    rejectFriend();
  }

  return (
    <div className="flex gap-4">
      <img
        src={senderInfo?.avatarUrl}
        className="h-20 w-20 rounded-full object-cover"
      ></img>
      <div className="grid grid-cols-2">
        <FriendRequestSenderInfo
          senderEmail={senderEmail}
          senderDisplayName={senderInfo?.displayName}
        />
        <FriendRequestResponseButtons
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
        <p className="text-xs py-2">Request sent {formattedDate}</p>
      </div>
    </div>
  );
}

export default FriendRequestTemplate;
