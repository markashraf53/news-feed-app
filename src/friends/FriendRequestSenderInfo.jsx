import PropTypes from "prop-types";
FriendRequestSenderInfo.propTypes = {
  senderEmail: PropTypes.string,
  senderDisplayName: PropTypes.string,
};

function FriendRequestSenderInfo({senderEmail, senderDisplayName}) {
    return (
        <div className="self-center">
          <p className="text-2xl font-semibold">{senderDisplayName}</p>
          <p>{senderEmail}</p>
        </div>
    )
}

export default FriendRequestSenderInfo
