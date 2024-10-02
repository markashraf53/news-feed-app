import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
PostContextProvider.propTypes = {
  children: PropTypes.any,
};

const PostContext = createContext();

const initialState = {
  postId: "",
  ownerId: "",
  usersLiked: [],
  comments: [],
  context: "",
  imgUrl: null,
  isLiked: false,
  showComments: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "post/setPost":
      return {
        ...state,
        postId: action.payload.id,
        ownerId: action.payload.ownerId,
        usersLiked: action.payload.usersLiked,
        comments: action.payload.comments,
        context: action.payload.context,
        imgUrl: action.payload.imgUrl || "",
      };
    case "post/setIsLiked":
      return { ...state, isLiked: action.payload };
    case "post/setShowComments":
      return { ...state, showComments: action.payload };

    default:
      console.log("action type is unknown");
  }
}

function PostContextProvider({ children }) {
  const [
    { postId, ownerId, usersLiked, comments, context, imgUrl, isLiked },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <PostContext.Provider
      value={{
        postId,
        ownerId,
        usersLiked,
        comments,
        context,
        imgUrl,
        isLiked,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePostContext() {
  const postContext = useContext(PostContext);
  return postContext;
}

export { PostContextProvider, usePostContext };
