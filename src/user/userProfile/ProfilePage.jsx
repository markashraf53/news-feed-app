import { ProfileProvider } from "../../contexts/ProfileContext";
import UserProfile from "./UserProfile";

function ProfilePage() {
  return (
    <ProfileProvider>
      <UserProfile />
    </ProfileProvider>
  );
}

export default ProfilePage;
