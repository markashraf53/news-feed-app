import FriendRequestsArea from "./FriendRequestsArea";
import NotificationsArea from "./NotificationsArea";

function UserNotifications() {
  return (
    <div className="flex justify-start gap-32 my-8 mx-10">
      <NotificationsArea />
      <FriendRequestsArea />
    </div>
  );
}

export default UserNotifications;
