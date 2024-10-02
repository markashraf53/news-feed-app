import { useMutation } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function useUploadPostPic(
  queryClient,
  setUploadedPicture,
  uploadedPicture,
  uid,
  postId
) {
  const { mutateAsync: uploadPostPic } = useMutation({
    mutationFn: () => uploadPostImage(uploadedPicture, uid, postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries("getPosts");
    },
    onSettled: async () => {
      setUploadedPicture(null);
      await queryClient.invalidateQueries("getPosts");
    },
  });

  return uploadPostPic;
}

async function uploadPostImage(uploadedPicture, uid, postId) {
  const imageRef = ref(storage, `posts/${postId.current}`);
  return await uploadBytes(imageRef, uploadedPicture).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((imgUrl) => {
      const postDocRef = doc(firestore, "users", uid, "posts", postId.current);
      updateDoc(postDocRef, { imgUrl });
    });
  });
}
