import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import useNotify from "./useNotify";

export default function useAddComment(
  commentsArray,
  setCantComment,
  setCommentText,
  commentText,
  uid,
  ownerId,
  postId
) {
  const notify = useNotify(uid, postId, ownerId);
  const queryClient = useQueryClient();
  const { mutateAsync: addComment } = useMutation({
    mutationFn: () =>
      postComment(commentsArray, uid, commentText, ownerId, postId, notify),
    onError: () => {
      setCantComment(false);
      setCommentText("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(`${postId}-post`);
      setCommentText("");
    },
    onSettled: () => {
      setCantComment(false);
    },
  });
  return addComment;
}

async function postComment(
  commentsArray,
  uid,
  commentText,
  ownerId,
  postId,
  notify
) {
  const comment = {
    commenterId: uid,
    text: commentText,
  };
  const postDocRef = doc(firestore, "users", ownerId, "posts", postId);
  if (commentsArray) {
    await updateDoc(postDocRef, { comments: [...commentsArray, comment] });
  } else {
    await updateDoc(postDocRef, { comments: [comment] });
  }

  notify("comment");
}
