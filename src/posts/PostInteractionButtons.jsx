import {
  faComment,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import SocialButton from "../ui/SocialButton";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "../ui/darkModeSlice";
import PropTypes from "prop-types";
import useUpdateUsersLiked from "./hooks/useUpdateUsersLiked";
import { useState } from "react";
import { usePostContext } from "../contexts/PostContext";
import { getAuthUserInfo } from "../user/userSlice";
import { serverTimestamp } from "firebase/firestore";
import useSharePost from "./hooks/useSharePost";

import useNotify from "./hooks/useNotify";

PostInteractionButtons.propTypes = {
  isLike: PropTypes.bool,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
};

function PostInteractionButtons({ onComment }) {
  const [cantLike, setCantLike] = useState(false);
  const authUser = useSelector(getAuthUserInfo);
  const isDarkMode = useSelector(getIsDarkMode);

  const {
    isLiked,
    ownerId,
    postId,
    usersLiked,
    dispatch,
    imgUrl,
    context,
    comments,
  } = usePostContext();

  const sharePost = useSharePost(authUser?.uid);

  const notify = useNotify(authUser?.uid, postId, ownerId);

  const updateUsersLiked = useUpdateUsersLiked(
    setCantLike,
    ownerId,
    postId,
    usersLiked,
    authUser?.uid
  );

  async function handleLike() {
    if (cantLike) return;
    updateUsersLiked();
    setCantLike(true);

    if (!isLiked) {
      dispatch({ type: "post/setIsLiked", payload: true });
    } else {
      dispatch({ type: "post/setIsLiked", payload: false });
    }
  }

  async function handleShare() {
    const newPost = {
      ownerId: authUser.uid,
      context,
      usersLiked,
      comments,
      timestamp: serverTimestamp(),
      imgUrl,
    };
    sharePost(newPost);
    notify("share");
  }

  return (
    <div
      className={`flex gap-4 mb-1 mx-4 border-t-2 pt-1 ${
        !isDarkMode ? "border-gray-300" : "border-gray-500"
      } `}
    >
      <SocialButton
        icon={faThumbsUp}
        onClick={handleLike}
        disabled={isLiked}
        textColor={isLiked ? "text-blue-500" : "text-gray-500"}
      >
        Like
      </SocialButton>
      <SocialButton
        icon={faComment}
        onClick={onComment}
        textColor="text-gray-500"
      >
        Comment
      </SocialButton>
      <SocialButton
        icon={faShare}
        textColor="text-gray-500"
        onClick={handleShare}
      >
        Share
      </SocialButton>
    </div>
  );
}

export default PostInteractionButtons;
