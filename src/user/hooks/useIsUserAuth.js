import { useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../userSlice";

export default function useIsUserAuth() {
  const authUserInfo = useSelector(getAuthUserInfo);
  const { profileOwnerDetails, userProfileInfoDispatch: dispatch } =
    useProfile();

  useEffect(() => {
    if (authUserInfo && profileOwnerDetails?.uid === authUserInfo.uid) {
      dispatch({ type: "profile/setIsAuth", payload: true });
      dispatch({
        type: "profile/setIsProfileReady",
        payload: true,
      });
    } else if (authUserInfo && profileOwnerDetails?.uid !== authUserInfo.uid) {
      dispatch({ type: "profile/setIsAuth", payload: false });
      dispatch({
        type: "profile/setIsProfileReady",
        payload: true,
      });
    } else
      dispatch({
        type: "profile/setIsProfileReady",
        payload: false,
      });
  }, [authUserInfo, dispatch, profileOwnerDetails]);
}
