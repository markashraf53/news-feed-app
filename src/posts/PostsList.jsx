import { PostContextProvider } from "../contexts/PostContext";
import Post from "./Post";
import PropTypes from "prop-types";

PostsList.propTypes = {
  postsToView: PropTypes.array,
};

function PostsList({ postsToView }) {
  return (
    <div className="grid space-y-5">
      {postsToView.map((post) => (
        <PostContextProvider key={post.id}>
          <Post post={post} />
        </PostContextProvider>
      ))}
    </div>
  );
}

export default PostsList;
