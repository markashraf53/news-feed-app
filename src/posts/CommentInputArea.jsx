import { useSelector } from "react-redux";
import SmallLoader from "../ui/SmallLoader";
import { getIsDarkMode } from "../ui/darkModeSlice";
import { useState } from "react";
import { getAuthUserInfo } from "../user/userSlice";
import useAddComment from "./hooks/useAddComment";
import PropTypes from "prop-types";
import { usePostContext } from "../contexts/PostContext";

CommentInputArea.propTypes = {
  postId: PropTypes.string,
  ownerId: PropTypes.string,
  commentsArray: PropTypes.array,
};

function CommentInputArea() {
  const [commentText, setCommentText] = useState("");
  const [cantComment, setCantComment] = useState(false);
  
  const { postId, ownerId, comments } = usePostContext();
  
  const isDarkMode = useSelector(getIsDarkMode);
  const authUser = useSelector(getAuthUserInfo);

  const addComment = useAddComment(
    comments,
    setCantComment,
    setCommentText,
    commentText,
    authUser?.uid,
    ownerId,
    postId
  );

  function handleSetComment(e) {
    setCommentText(e.target.value);
  }

  function handleAddComment() {
    if (cantComment || commentText === "") return;
    setCantComment(true);
    addComment();
  }

  return (
    <>
      <textarea
        className={`w-full h-10 max-h-auto p-1.5 mb-4 mt-2 border resize-none border-gray-300 rounded-lg ${
          isDarkMode ? "bg-slate-600" : "bg-slate-100"
        }`}
        placeholder="Enter your comment"
        value={commentText}
        onChange={handleSetComment}
      ></textarea>
      <div className="grid">
        {cantComment ? (
          <SmallLoader>Adding Comment</SmallLoader>
        ) : (
          <button
            className="justify-self-end bg-slate-300 hover:bg-slate-400 rounded px-1.5 py-0.5"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        )}
      </div>
    </>
  );
}

export default CommentInputArea;
