import { useSelector } from "react-redux";
import UserBio from "./UserBio";
import { getAuthUserInfo } from "../userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeCircleCheck,
  faUserCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import useIsRequestSendAlready from "./hooks/useIsRequestSendAlready";
import useAddFriendProfile from "./hooks/useAddFriendProfile";
import useCancelRequestProfile from "./hooks/useCancelRequestProfile";

function ProfileInfo() {
  const authUserInfo = useSelector(getAuthUserInfo);
  const { isUserAFriend, isAuth, profileOwnerDetails } = useProfile();
  const recipientId = useRef(profileOwnerDetails?.uid);
  const [checkIfRequestSentAlready, setCheckIfRequestSentAlready] =
    useState(false);
  const check = useIsRequestSendAlready(
    profileOwnerDetails?.email,
    authUserInfo?.uid
  );

  useEffect(() => {
    if (check !== undefined) setCheckIfRequestSentAlready(check);
  }, [check]);

  const addFriendMutate = useAddFriendProfile(
    profileOwnerDetails?.email,
    recipientId,
    authUserInfo?.email,
    authUserInfo?.uid
  );

  const cancelFriendRequestMutate = useCancelRequestProfile(
    profileOwnerDetails?.uid,
    profileOwnerDetails?.email,
    authUserInfo?.uid,
    authUserInfo?.email
  );

  function handleCancelRequest() {
    cancelFriendRequestMutate();
    setCheckIfRequestSentAlready(false);
  }

  function handleAddFriend() {
    addFriendMutate();
    setCheckIfRequestSentAlready(true);
  }

  return (
    <div className="max-w-auto h-68">
      <div className="flex gap-6 mt-2">
        <p className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold  mb-1">
          {profileOwnerDetails?.displayName}
        </p>
        {!isAuth && isUserAFriend && (
          <button className="self-center bg-sky-300/75 px-2 py-1 rounded-lg">
            <FontAwesomeIcon icon={faUserCheck} /> Friends
          </button>
        )}

        {!isAuth && !isUserAFriend && !checkIfRequestSentAlready && (
          <button
            className="self-center bg-sky-300/75 px-2 py-1 rounded-lg"
            onClick={handleAddFriend}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Add Friend
          </button>
        )}

        {!isAuth && !isUserAFriend && checkIfRequestSentAlready && (
          <button
            className="self-center bg-sky-300/75 px-2 py-1 rounded-lg"
            onClick={handleCancelRequest}
          >
            <FontAwesomeIcon icon={faEnvelopeCircleCheck} /> request sent
          </button>
        )}
      </div>
      {isAuth ||
        (isUserAFriend && (
          <p className="text-start ml-1 text-sm sm:text-base md:text-lg lg:text-xl">
            {profileOwnerDetails?.email}
          </p>
        ))}
      <p className="text-2xl text-start ml-1 mb-1 font-light">Bio</p>
      <UserBio isAuth={isAuth} bio={profileOwnerDetails?.bio} />
    </div>
  );
}

export default ProfileInfo;
