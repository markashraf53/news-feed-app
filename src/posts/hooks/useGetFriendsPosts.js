import { useInfiniteQuery } from "@tanstack/react-query";
import { getFriendsPosts } from "../../services/PostHandleService";

const useGetFriendsPosts = (friendsList) => {
  const {
    data: friendsPostsData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getFriendsPosts", friendsList],
    queryFn: ({ pageParam = null }) => getFriendsPosts(friendsList, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.length > 0) {
        return lastPage[lastPage.length - 1].id;
      }
      return null;
    },
  });

  return {
    friendsPostsData,
    fetchNextPage,
    hasNextPage,
  };
};

export default useGetFriendsPosts;
