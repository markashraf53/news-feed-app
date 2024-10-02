import Loader from "../ui/Loader";
import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../user/userSlice";
import { useState } from "react";
import useGetFriendList from "../friends/hooks/useGetFriendList";
import PostsList from "./PostsList";
import useGetFriendsPosts from "./hooks/useGetFriendsPosts";
import useSetFriendsPostsEffect from "./hooks/useSetFriendsPostsEffect";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoader from "../ui/SmallLoader";

function PostsFeed() {
  const userInfo = useSelector(getAuthUserInfo);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const { friendsList, isFriendListLoading } = useGetFriendList(userInfo?.uid);

  const { friendsPostsData, fetchNextPage, hasNextPage } =
    useGetFriendsPosts(friendsList);

  useSetFriendsPostsEffect(friendsPostsData, setFriendsPosts);

  return (
    <>
      {isFriendListLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={friendsPosts.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<SmallLoader />}
          endMessage={<p className="text-center pt-4">No more posts.</p>}
          scrollThreshold="100px"
        >
          <PostsList postsToView={friendsPosts} />
        </InfiniteScroll>
      )}
    </>
  );
}

export default PostsFeed;
