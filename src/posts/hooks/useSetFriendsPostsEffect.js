import { useEffect } from "react";

const useSetFriendsPostsEffect = (friendsPostsData, setFriendsPosts) => {
  useEffect(() => {
    if (friendsPostsData) {
      const friendsPosts = friendsPostsData?.pages.reduce(
        (acc, page) => [...acc, ...page],
        []
      );
      setFriendsPosts(friendsPosts);
    }
  }, [friendsPostsData, setFriendsPosts]);
};

export default useSetFriendsPostsEffect;
