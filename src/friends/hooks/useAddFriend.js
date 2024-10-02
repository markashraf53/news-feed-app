import { useMutation } from "@tanstack/react-query";
import {
  checkIfAFriendRequestWasAlreadySent,
  checkIfRecipientIsAFriend,
  friendRequestSendHandler,
} from "../../services/FriendsService";

export default function useAddFriend(
  isRequestSent,
  setRecipientEmail,
  reipientEmail,
  recipientId,
  sender,
  setErrorMsg
) {
  const { mutateAsync: addFriend } = useMutation({
    mutationFn: () => sendFriendRequest(reipientEmail, sender, recipientId),
    onSuccess: () => {
      isRequestSent.current = true;
      setRecipientEmail("");
      setErrorMsg(null);
    },
    onError: (e) => {
      console.log(e.message);
      if (
        e.message ===
        `Invalid document reference. Document references must have an even number of segments, but users/friendRequestsReceived/${sender.email} has 3.`
      ) {
        setErrorMsg("User doesn't exist");
      } else setErrorMsg(e.message);
      isRequestSent.current = false;
    },
  });
  return addFriend;
}

async function sendFriendRequest(reipientEmail, sender, recipientId) {
  try {
    if (reipientEmail === sender.email) {
      throw new Error("You can't send a friend request to yourself!");
    }

    //check if user is already in friends list
    const isUserAFriend = await checkIfRecipientIsAFriend(
      reipientEmail,
      sender.uid
    );
    if (isUserAFriend) {
      throw new Error(`You are already friends with ${reipientEmail}`);
    }
    // check if a friend request was already sent
    const isAFriendRequestWasAlreadySent =
      await checkIfAFriendRequestWasAlreadySent(reipientEmail, sender.uid);
    if (isAFriendRequestWasAlreadySent) {
      throw new Error(`A friend request was already sent to ${reipientEmail}`);
    }
    // sending the friend request logic
    await friendRequestSendHandler(
      reipientEmail,
      recipientId,
      sender.email,
      sender.uid
    );
  } catch (e) {
    console.log(e.message);
    throw new Error(e.message);
  } finally {
    recipientId.current = "";
  }
}
