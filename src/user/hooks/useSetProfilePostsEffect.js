import { useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContext";

export default function useSetProfilePostsEffect(userPostsData) {
  const { userProfileInfoDispatch } = useProfile();
  useEffect(() => {
    if (userPostsData) {
      const postArray = userPostsData.pages.reduce(
        (acc, post) => [...acc, ...post],
        []
      );
      userProfileInfoDispatch({
        type: "profile/setProfileOwnerPosts",
        payload: postArray,
      });
    }
  }, [userPostsData, userProfileInfoDispatch]);
}
