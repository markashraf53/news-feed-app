import { faUsers } from "@fortawesome/free-solid-svg-icons";
import NotificationHeader from "./NotificationHeader";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../user/userSlice";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import FriendRequestTemplate from "../friends/FriendRequestTemplate";

function FriendRequestsArea() {
  const userInfo = useSelector(getAuthUserInfo);
  const [friendRequests, setFriendRequests] = useState([]);
  const { data } = useQuery({
    queryKey: ["getFriendRequests", userInfo?.uid],
    queryFn: getFriendRequests,
  });

  useEffect(() => {
    if (data) {
      setFriendRequests(data);
    }
  }, [data]);

  async function getFriendRequests(uid) {
    if (!uid) return;
    const receivedFriendRequestsCollectionRef = collection(
      firestore,
      "users",
      userInfo.uid,
      "friendRequestsReceived"
    );
    const res = await getDocs(receivedFriendRequestsCollectionRef);
    const friendRequests = [];
    res.forEach((doc) => {
      friendRequests.push(doc.data());
    });
    return friendRequests;
  }

  return (
    <div className="mr-12 grid gap-3 h-screen content-start">
      <NotificationHeader
        title="Friend Requests"
        icon={faUsers}
      ></NotificationHeader>

      {friendRequests.length !== 0 ? (
        <div className="grid gap-4">
          {friendRequests.map((friendRequest, i) => (
            <FriendRequestTemplate
              key={i}
              senderEmail={friendRequest.senderEmail}
              senderId={friendRequest.senderId}
              timestamp={friendRequest.timestamp}
            ></FriendRequestTemplate>
          ))}
        </div>
      ) : (
        <p>You have no pending friend requests.</p>
      )}
    </div>
  );
}

export default FriendRequestsArea;
