import { useQuery } from "@tanstack/react-query";
import { getFriendsList } from "../../services/FriendsService";

export default function useGetFriendList(uid) {
  const { data: friendsList, isLoading: isFriendListLoading } = useQuery({
    queryKey: ["getFriendsList", uid],
    queryFn: () => {
      if (uid) {
        return getFriendsList(uid);
      } else return [];
    },
  });
  return { friendsList, isFriendListLoading };
}
