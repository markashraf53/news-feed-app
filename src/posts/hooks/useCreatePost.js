import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUploadPostPic from "./useUploadPostPic";
import { useRef } from "react";
import { addPost } from "../../services/PostHandleService";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function useCreatePost(
  uploadedPicture,
  setUploadedPicture,
  setPostContext,
  setIsPosting,
  uid
) {
  const postId = useRef("");
  const queryClient = useQueryClient();
  const uploadPostPic = useUploadPostPic(
    queryClient,
    setUploadedPicture,
    uploadedPicture,
    uid,
    postId
  );

  const { mutate: uploadPost } = useMutation({
    mutationFn: async (post) => {
      const postInfo = await addPost(post, uid);
      postId.current = postInfo.id;
      updateDoc(doc(firestore, "users", uid, "posts", postInfo.id), {id: postInfo.id})
      return postInfo;
    },
    onSuccess: async () => {
      if (uploadedPicture) {
        await uploadPostPic();
      }
      await queryClient.invalidateQueries("getPosts");
    },
    onSettled: async () => {
      setPostContext("");
      setIsPosting(false);
    },
    onError: async () => {
      setPostContext("");
      if (uploadedPicture) {
        setUploadedPicture(null);
      }
      setIsPosting(false);
    },
  });

  return uploadPost;
}
