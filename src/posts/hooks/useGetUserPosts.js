import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsWithPaging } from "../../services/PostHandleService";

export default function useGetUserPosts(userId) {
  const { data: userPostsData, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["getProfilePosts", userId],
    queryFn: ({ pageParam = null }) =>
      fetchPostsWithPaging(userId, 3, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.length > 0) {
        return lastPage[lastPage.length - 1].id;
      }
      return null;
    },
  })
  return {userPostsData, hasNextPage, fetchNextPage}
}
