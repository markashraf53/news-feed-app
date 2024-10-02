import { usePostContext } from "../contexts/PostContext";
import useGetPostOwnerInfo from "./hooks/useGetPostOwnerInfo";

function PostOwnerInfo() {
  const { postId, ownerId } = usePostContext();
  const ownerInfo = useGetPostOwnerInfo(postId, ownerId);
  return (
    <div className="flex gap-2">
      <img
        src={ownerInfo?.avatarUrl}
        className="h-10 w-10 rounded-full overflow-hidden object-cover"
      ></img>
      <p className="self-center font-semibold text-md font-[Roboto]">
        {ownerInfo?.displayName}
      </p>
    </div>
  );
}

export default PostOwnerInfo;
