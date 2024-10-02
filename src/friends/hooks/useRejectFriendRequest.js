import { useMutation, useQueryClient } from "@tanstack/react-query";
import { firestore } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function useRejectFriendRequest(
  uid,
  userEmail,
  senderId,
  senderEmail
) {
  const queryClient = useQueryClient()
  const { mutateAsync: rejectFriend } = useMutation({
    mutationFn: () => onRejectRequest(uid, userEmail, senderId, senderEmail),
    onSuccess: () => {
      console.log("Friend Request Rejected!");
      queryClient.invalidateQueries("getFriendRequests", uid);
    },
    onError: () => {
      console.log("There was an Error!");
      queryClient.invalidateQueries("getFriendRequests", uid);
    },
  });
  return rejectFriend;
}

export async function onRejectRequest(uid, userEmail, senderId, senderEmail) {
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
