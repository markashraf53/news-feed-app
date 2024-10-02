import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuthUserInfo } from "../user/userSlice";
import PropTypes from "prop-types";
import CommentSectionModal from "./CommentSectionModal";
import DropdownMenu from "../ui/DropDownMenu";
import PostContainer from "./PostContainer";
import PostInteractionButtons from "./PostInteractionButtons";
import PostImage from "./PostImage";
import PostOwnerInfo from "./PostOwnerInfo";
import PostStatus from "./PostStatus";
import { usePostContext } from "../contexts/PostContext";
import useDeletePost from "./hooks/useDeletePost";

Post.propTypes = {
  post: PropTypes.object,
};

function Post({ post }) {
  const { usersLiked, context, imgUrl, dispatch, ownerId, postId } =
    usePostContext();
  const [showComments, setShowComments] = useState(false);
  const authUser = useSelector(getAuthUserInfo);
  const isAuth = ownerId === authUser?.uid;
  const isImg = imgUrl ? true : false;

  useEffect(() => {
    if (post) {
      dispatch({ type: "post/setPost", payload: post });
    }
  }, [dispatch, post]);

  useEffect(() => {
    if (usersLiked && usersLiked.includes(authUser?.uid)) {
      dispatch({ type: "post/setIsLiked", payload: true });
    } else dispatch({ type: "post/setIsLiked", payload: false });
  }, [authUser?.uid, usersLiked, dispatch]);

  const { deletePostMutation } = useDeletePost(postId, ownerId, isImg);

  function handleComment() {
    setShowComments((showComments) => !showComments);
  }

  function handleDeletePost() {
    if (isAuth) {
      deletePostMutation();
    }
  }

  return (
    <div>
      <PostContainer>
        <div className="flex gap-2 p-1.5 w-full justify-between items-center">
          <PostOwnerInfo />
          <div>
            {isAuth && (
              <DropdownMenu>
                <button className="px-2 p-1" onClick={handleDeletePost}>
                  Delete post
                </button>
              </DropdownMenu>
            )}
          </div>
        </div>
        <p className="ml-2.5 my-1 font-medium text-lg">{context}</p>

        {imgUrl ? <PostImage /> : null}
        <PostStatus usersLiked={usersLiked} />

        <PostInteractionButtons onComment={handleComment} />
      </PostContainer>

      <div className="mt-0.5">{showComments && <CommentSectionModal />}</div>
    </div>
  );
}

export default Post;
