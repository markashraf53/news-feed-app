import PropTypes from "prop-types";
import useCommenterInfo from "./hooks/useCommenterInfo";

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

function Comment({ comment }) {
  const commenterInfo = useCommenterInfo(comment.commenterId);

  return (
    <div className="flex gap-1 max-w-[22rem]">
      <img
        src={commenterInfo?.avatarUrl}
        className="w-8 h-8 rounded-full"
      ></img>
      <div className="flex flex-col h-auto space-y-0 p-1.5 pt-1 px-3 bg-slate-300/75 rounded-2xl max-w-[22rem] overflow-auto">
        <p className="font-semibold text-sm">{commenterInfo?.name}</p>
        <p className="font-light">{comment.text}</p>
      </div>
    </div>
  );
}

export default Comment;
