import { useEffect } from "react";
import { checkIfRecipientIsAFriend } from "../../services/FriendsService";
import { useProfile } from "../../contexts/ProfileContext";
import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../userSlice";

export default function useIsUserAFriend() {
  const authUserInfo = useSelector(getAuthUserInfo);
  const { profileOwnerDetails, userProfileInfoDispatch } = useProfile();

  useEffect(() => {
    if (authUserInfo && profileOwnerDetails) {
      const check = async () => {
        const isUserAFriendRes = await checkIfRecipientIsAFriend(
          profileOwnerDetails?.email,
          authUserInfo.uid
        );
        userProfileInfoDispatch({
          type: "profile/setIsUserAFriend",
          payload: isUserAFriendRes,
        });
      };
      check();
    }
  }, [authUserInfo, profileOwnerDetails, userProfileInfoDispatch]);
}
