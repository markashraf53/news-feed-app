import { useMutation, useQueryClient } from "@tanstack/react-query";
import { firestore } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import useNotify from "./useNotify";

export default function useUpdateUsersLiked(
  setCantLike,
  ownerId,
  postId,
  usersLiked,
  uid
) {
  const notify = useNotify(uid, postId, ownerId);

  const queryClient = useQueryClient();
  const { mutateAsync: updateUsersLiked } = useMutation({
    mutationFn: () =>
      changeUsersLiked(ownerId, postId, usersLiked, uid, notify),
    onError: () => {
      setCantLike(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(`${postId}-post`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(`${postId}-post`);
      setCantLike(false);
    },
  });
  return updateUsersLiked;
}

async function changeUsersLiked(ownerId, postId, usersLiked, uid, notify) {
  const postDocRef = doc(firestore, "users", ownerId, "posts", postId);
  if (usersLiked) {
    const isUserLiked = usersLiked.includes(uid);
    if (!isUserLiked) {
      await updateDoc(postDocRef, {
        usersLiked: [...usersLiked, uid],
      });
      notify("like");
    } else {
      await updateDoc(postDocRef, {
        usersLiked: usersLiked.filter((user) => user !== uid),
      });
    }
  } else
    await updateDoc(postDocRef, {
      usersLiked: [uid],
    });
}
