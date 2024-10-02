import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase";

async function deletePost(postId, userId, isImg) {
  const postRef = doc(firestore, "users", userId, "posts", postId);
  const resDocDelete = await deleteDoc(postRef);
  if (!isImg) return resDocDelete;
  try
  {const postImgRef = ref(storage, `posts/${postId}`);
  const resImgDelete = await deleteObject(postImgRef);
  return { resDocDelete, resImgDelete }}
  catch(e){
    console.log(e)
  }
}

const useDeletePost = (postId, userId, isImg) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deletePostMutation } = useMutation({
    mutationFn: () => deletePost(postId, userId, isImg),
    onSuccess: () => {
      queryClient.invalidateQueries("getProfilePosts");
    },
    onSettled: () => {
      queryClient.invalidateQueries("getProfilePosts");
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return { deletePostMutation };
};

export default useDeletePost;
