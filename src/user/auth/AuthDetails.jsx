import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserInfo, logOut, setUserInformation } from "../userSlice";
import useAuthUserID from "../../hooks/useAuthUserID";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/UserProfileService";

function AuthDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUserInfo = useSelector(getAuthUserInfo);
  const userId = useAuthUserID();

  useQuery({
    queryKey: ["getProfileInfo", userId],
    queryFn: async () => {
      const userInfo = await getUserDetails(userId);
      if (userInfo) {
        dispatch(setUserInformation(userInfo));
      } else dispatch(setUserInformation(null));
      return userInfo;
    },
  });

  function userSignOut() {
    signOut(auth)
      .then(() => console.log("sign out successful"))
      .catch((e) => console.log(e));
    dispatch(setUserInformation(null));
    dispatch(logOut());
    navigate("/sign-in");
  }

  return (
    <div className="grid mr-2 sm:mr-4 justify-end text-sm md:text-base font-medium">
      {authUserInfo && (
        <div className="justify-self-end grid justify-items-end">
          <p>{authUserInfo.displayName}</p>
          <p className="hidden md:block md:text-[0.63rem] lg:text-xs">
            {authUserInfo.email}
          </p>
          <button
            onClick={userSignOut}
            className="underline hover:text-blue-500 pointer-events-auto"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthDetails;
