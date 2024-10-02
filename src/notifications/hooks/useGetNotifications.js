import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../../user/userSlice";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function useGetNotifications() {
  const authUser = useSelector(getAuthUserInfo);
  const { data: notifications } = useQuery({
    queryKey: ["getNotifications", authUser?.uid],
    queryFn: getNotifications,
  });

  async function getNotifications() {
    const notifications = [];
    const notificationsCollectionRef = collection(
      firestore,
      "users",
      authUser?.uid,
      "notifications"
    );
    const orderedQuery = query(
      notificationsCollectionRef,
      orderBy("timeStamp", "desc")
    );
    const querySnapshot = await getDocs(orderedQuery);
    querySnapshot.forEach((doc) => {
      notifications.push(doc.data());
    });
    return notifications;
  }

  return notifications;
}
