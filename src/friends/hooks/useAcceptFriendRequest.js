import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAcceptFriendRequest(
  uid,
  userEmail,
  senderId,
  senderEmail
) {
  const queryClient = useQueryClient()
  const { mutateAsync: acceptFriend } = useMutation({
    mutationFn: () => onAcceptRequest(uid, userEmail, senderId, senderEmail),
    onSuccess: () => {
      console.log("Friend Request Accepted!");
      queryClient.invalidateQueries("getFriendRequests", uid);
    },
    onError: () => {
      console.log("There was an Error!");
      queryClient.invalidateQueries("getFriendRequests", uid);
    },
  });
  return acceptFriend;
}

async function onAcceptRequest(uid, userEmail, senderId, senderEmail) {
  const userFriendsCollectionRef = doc(
    firestore,
    "users",
    uid,
    "friends",
    senderEmail
  );
  const senderFriendsCollectionRef = doc(
    firestore,
    "users",
    senderId,
    "friends",
    userEmail
  );
  const userNewFriend = {
    friendEmail: senderEmail,
    friendId: senderId,
  };
  const senderNewFriend = {
    friendEmail: userEmail,
    friendId: uid,
  };
  await setDoc(userFriendsCollectionRef, userNewFriend);
  await setDoc(senderFriendsCollectionRef, senderNewFriend);

  const userFriendRequestReceivedDocRef = doc(
    firestore,
    "users",
    uid,
    "friendRequestsReceived",
    senderEmail
  );

  const senderFriendRequestsSentDocRef = doc(
    firestore,
    "users",
    senderId,
    "friendRequestsSent",
    userEmail
  );

  await deleteDoc(userFriendRequestReceivedDocRef);
  await deleteDoc(senderFriendRequestsSentDocRef);
}
