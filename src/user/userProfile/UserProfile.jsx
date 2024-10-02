import { useSelector } from "react-redux";
import { getIsDarkMode } from "../../ui/darkModeSlice";
import { useEffect } from "react";
import Loader from "../../ui/Loader";
import UserAvatar from "./UserAvatar";
import ProfileInfo from "./ProfileInfo";
import UserHobbies from "./UserHobbies";
import UserJobs from "./UserJobs";
import { useProfile } from "../../contexts/ProfileContext";
import { useParams } from "react-router-dom";
import PostsList from "../../posts/PostsList";
import useIsUserAFriend from "../hooks/useIsUserAFriend";
import useGetUserPosts from "../../posts/hooks/useGetUserPosts";
import useIsUserAuth from "../hooks/useIsUserAuth";
import useGetUserDetails from "../hooks/useGetUserDetails";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoader from "../../ui/SmallLoader";
import useSetProfilePostsEffect from "../hooks/useSetProfilePostsEffect";

function UserProfile() {
  const { userId } = useParams();
  const isDarkMode = useSelector(getIsDarkMode);
  const { userInfo } = useGetUserDetails(userId);
  const {
    userProfileInfoDispatch,
    profileOwnerDetails,
    profileOwnerPosts,
    isUserAFriend,
    isProfileReady,
    isAuth,
  } = useProfile();

  useEffect(() => {
    if (userInfo) {
      userProfileInfoDispatch({
        type: "profile/setProfileOwnerDetails",
        payload: userInfo,
      });
    }
  }, [userInfo, userProfileInfoDispatch]);

  useIsUserAFriend();

  const { userPostsData, hasNextPage, fetchNextPage } = useGetUserPosts(userId);

  useSetProfilePostsEffect(userPostsData);

  useIsUserAuth();

  return (
    <>
      {isProfileReady ? (
        <div
          className={`h-full ${
            !isDarkMode ? "text-slate-500" : "text-slate-300"
          } `}
        >
          <div className="flex space-x-6 ml-7 mt-7 max-h-auto">
            <UserAvatar />
            <ProfileInfo />
            <div className="border-l-2 pl-5 border-slate-400/50 p-2">
              <p>age: {profileOwnerDetails?.age}</p>
              <UserJobs />
              <UserHobbies />
            </div>
          </div>

          <div className="grid grid-cols-2 my-10 mx-10">
            <div className="grid border-2 border-slate-400/50 rounded-lg ga-2 p-4">
              <p className="justify-self-center text-3xl font-extrabold text-blue-500">
                {userInfo?.displayName} posts
              </p>
              <div className=" border-t-2 border-slate-400/50 my-4 p-2"></div>
              <div className="justify-self-center">
                {(profileOwnerPosts?.length !== 0 && isUserAFriend) ||
                isAuth ? (
                  <InfiniteScroll
                    dataLength={profileOwnerPosts.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<SmallLoader />}
                    endMessage={<p className="text-center">No more posts.</p>}
                    scrollThreshold="100px"
                  >
                    <PostsList postsToView={profileOwnerPosts} />
                  </InfiniteScroll>
                ) : (
                  <p>There are no posts to view.</p>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default UserProfile;
