import { useReducer } from "react";

const initialState = {
  profileOwnerDetails: null,
  isAuth: false,
  isProfileReady: false,
  isUserAFriend: false,
  profileOwnerPosts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return;
    case "profile/setProfileOwnerDetails":
      return { ...state, profileOwnerDetails: action.payload };
    case "profile/setIsAuth":
      return { ...state, isAuth: action.payload };
    case "profile/setIsProfileReady":
      return { ...state, isProfileReady: action.payload };
    case "profile/setIsUserAFriend":
      return { ...state, isUserAFriend: action.payload };
    case "profile/setProfileOwnerPosts":
      return { ...state, profileOwnerPosts: action.payload };
  }
};

export default function useUserProfileInfo() {
  const [userProfileInfoState, userProfileInfoDispatch] = useReducer(
    reducer,
    initialState
  );

  return [userProfileInfoState, userProfileInfoDispatch];
}
