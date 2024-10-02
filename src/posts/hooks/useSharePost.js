import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function useSharePost(uid) {
  const { mutate: sharePost } = useMutation({
    mutationFn: shareMutation,
  });

  async function shareMutation(post) {
    const docRef = await addDoc(
      collection(firestore, "users", uid, "posts"),
      post
    );
    updateDoc(docRef, { id: docRef.id });
  }

  return sharePost;
}
