import PropTypes from "prop-types";
FriendRequestResponseButtons.propTypes = {
  onAcceptRequest: PropTypes.func.isRequired,
  onRejectRequest: PropTypes.func.isRequired,
};

function FriendRequestResponseButtons({ onAcceptRequest, onRejectRequest }) {
  return (
    <div className="flex self-center gap-3 text-sm mt-3 ml-2">
      <button
        className="bg-green-400/75 hover:bg-green-400 px-4 py-2 rounded-xl"
        onClick={onAcceptRequest}
      >
        Accept Request
      </button>
      <button
        className="bg-red-400/75 hover:bg-red-400 px-4 py-2 rounded-xl"
        onClick={onRejectRequest}
      >
        Reject Request
      </button>
    </div>
  );
}

export default FriendRequestResponseButtons;
