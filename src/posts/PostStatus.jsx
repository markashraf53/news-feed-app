import { usePostContext } from "../contexts/PostContext";

function PostStatus() {
  const { usersLiked, comments } = usePostContext();

  return (
    <div className=" h-auto flex pl-4 pt-1 text-sm text-blue-400 items-end gap-4">
      <p>{usersLiked?.length !== 0 ? `${usersLiked?.length} Likes` : null}</p>
      <p>{comments.length !== 0 ? `${comments.length} Comments` : null}</p>
    </div>
  );
}

export default PostStatus;
