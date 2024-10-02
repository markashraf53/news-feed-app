import { useParams } from "react-router-dom";
import Post from "./Post";
import { PostContextProvider } from "../contexts/PostContext";
import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../user/userSlice";
import useGetPost from "./hooks/useGetPost";

function PostView() {
  const { postId } = useParams();
  const authUser = useSelector(getAuthUserInfo);
  const post = useGetPost(authUser?.uid, postId);

  return (
    <div className="flex justify-center mt-4">
      <PostContextProvider key={postId}>
        <Post post={post} />
      </PostContextProvider>
    </div>
  );
}

export default PostView;
