import { useQuery } from "@tanstack/react-query";
import { firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function useGetPost(uid, postId) {
  const { data: post } = useQuery({
    queryKey: ["getPost", uid, postId],
    queryFn: getPost,
  });

  async function getPost() {
    if (!uid) return null
    try {
      const postRef = doc(firestore, "users", uid, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
      return postData;
    } catch (e) {
      console.log(e);
    }
  }

  return post;
}
