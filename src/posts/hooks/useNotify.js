import { useMutation } from "@tanstack/react-query";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import notificationNamingFn from "../../helpers/notificationNamingFn";
import { firestore } from "../../firebase";

export default function useNotify(reactorId, postId, postOwnerId) {
  const { mutate: notify } = useMutation({
    mutationFn: notifyMutation,
  });

  async function notifyMutation(notificationType) {
    const notification = {
      reactorId,
      postId,
      notificationType,
      timeStamp: serverTimestamp(),
    };
    const notificationName = notificationNamingFn(
      notificationType,
      reactorId,
      postId
    );
    const notificationDocRef = doc(
      firestore,
      "users",
      postOwnerId,
      "notifications",
      notificationName
    );

    await setDoc(notificationDocRef, notification);
  }

  return notify;
}
