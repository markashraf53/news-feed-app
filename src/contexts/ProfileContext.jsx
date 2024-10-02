import { createContext, useContext } from "react";
import { useHobbies } from "../user/userProfile/hooks/useHobbies";
import { useJobs } from "../user/userProfile/hooks/useJobs";
import PropTypes from "prop-types";
import useUserProfileInfo from "../user/userProfile/hooks/useUserProfileInfo";

ProfileProvider.propTypes = {
  children: PropTypes.any,
};

const ProfileContext = createContext();

function ProfileProvider({ children }) {
  const [hobbiesState, hobbiesDispatch] = useHobbies();
  const [jobsState, jobsDispatch] = useJobs();
  const [userProfileInfoState, userProfileInfoDispatch] = useUserProfileInfo();

  return (
    <ProfileContext.Provider
      value={{
        ...hobbiesState,
        hobbiesDispatch,
        ...jobsState,
        jobsDispatch,
        ...userProfileInfoState,
        userProfileInfoDispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile() {
  const context = useContext(ProfileContext);
  return context;
}

export { ProfileProvider, useProfile };
