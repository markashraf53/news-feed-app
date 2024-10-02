import { useQuery } from "@tanstack/react-query";
import { getPostOwnerInfo } from "../../services/PostHandleService";

export default function useGetPostOwnerInfo(postId, ownerId) {
  const { data: ownerInfo } = useQuery({
    queryKey: [`${postId}-post`],
    queryFn: () => getPostOwnerInfo(ownerId),
  });
  return ownerInfo;
}
