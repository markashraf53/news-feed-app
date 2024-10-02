import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";

export async function checkIfRecipientIsAFriend(email, senderId) {
  const userFriendsList = collection(firestore, "users", senderId, "friends");
  const friendsQuery = query(
    userFriendsList,
    where("friendEmail", "==", email)
  );
  const friendsSnapshot = await getDocs(friendsQuery);
  const friendsCheck = [];
  friendsSnapshot.forEach((doc) => {
    friendsCheck.push(doc.data());
  });

  return friendsCheck.length !== 0;
}

export async function checkIfAFriendRequestWasAlreadySent(email, senderId) {
  const senderFriendRequestsSentCollectionRef = collection(
    firestore,
    "users",
    senderId,
    "friendRequestsSent"
  );
  const friendRequestsSentQuery = query(
    senderFriendRequestsSentCollectionRef,
    where("recipientEmail", "==", email)
  );
  const friendRequestsSentSnapshot = await getDocs(friendRequestsSentQuery);
  const friendRequestsSentCheck = [];
  friendRequestsSentSnapshot.forEach((doc) => {
    friendRequestsSentCheck.push(doc.data());
  });
  return friendRequestsSentCheck.length !== 0;
}

export async function friendRequestSendHandler(
  email,
  recipientId,
  senderEmail,
  senderId
) {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    recipientId.current = doc.id;
  });
  const recipientFriendRequestsReceivedRef = doc(
    firestore,
    "users",
    recipientId.current,
    "friendRequestsReceived",
    senderEmail
  );

  const senderFriendRequestsSentRef = doc(
    firestore,
    "users",
    senderId,
    "friendRequestsSent",
    email
  );

  const friendRequestReceived = {
    senderId: senderId,
    senderEmail: senderEmail,
    timestamp: new Date(),
  };

  const friendRequestSent = {
    recipientId: recipientId.current,
    recipientEmail: email,
    timestamp: new Date(),
  };

  await setDoc(recipientFriendRequestsReceivedRef, friendRequestReceived);
  await setDoc(senderFriendRequestsSentRef, friendRequestSent);
}

export async function getFriendsList(uid) {
  const userFriendsListCollectionRef = collection(
    firestore,
    "users",
    uid,
    "friends"
  );
  const friendsList = [];
  const snapshot = await getDocs(userFriendsListCollectionRef);
  snapshot.forEach((friend) => {
    friendsList.push(friend.data());
  });
  return friendsList;
}

export async function getFriendsListWithPaging(uid, lastFriendEmail = null) {
  const friendList = [];
  const friendListRef = collection(firestore, "users", uid, "friends");
  let queryGetFriends = query(friendListRef, limit(1));
  if (lastFriendEmail) {
    const lastFriendDocSnapshot = await getDoc(
      doc(friendListRef, lastFriendEmail)
    );
    queryGetFriends = query(
      friendListRef,
      limit(1),
      startAfter(lastFriendDocSnapshot)
    );
  }
  const friendsSnapshot = await getDocs(queryGetFriends);
  friendsSnapshot.docs.map((doc) => friendList.push({ ...doc.data() }));
  return friendList;
}
