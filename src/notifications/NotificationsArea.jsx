import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationHeader from "./NotificationHeader";
import useGetNotifications from "./hooks/useGetNotifications";
import Notification from "./Notification";

function NotificationsArea() {
  const notifications = useGetNotifications();
    
  return (
    <div className="ml-10 grid gap-3 h-screen content-start">
      <NotificationHeader
        title="Notifications"
        icon={faBell}
      ></NotificationHeader>

      {notifications && notifications.length !== 0 ? (
        notifications?.map((notification) => (
          <Notification
            notification={notification}
            key={notification.timeStamp}
          />
        ))
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
}

export default NotificationsArea;
