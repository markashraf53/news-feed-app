import { usePostContext } from "../contexts/PostContext";
import Comment from "./Comment";
import PropTypes from "prop-types";
CommentsList.propTypes = {
  commentsArray: PropTypes.array,
};

function CommentsList() {
  const { comments } = usePostContext();

  return (
    <>
      {comments && (
        <div className="grid gap-2">
          {comments.length !== 0 &&
            comments.map((comment, i) => <Comment comment={comment} key={i} />)}
        </div>
      )}
    </>
  );
}

export default CommentsList;
