import { useQuery } from "@tanstack/react-query";
import { checkIfAFriendRequestWasAlreadySent } from "../../../services/FriendsService";

const useIsRequestSendAlready = (profileOwnerEmail, authUserUid) => {
  const { data: check } = useQuery({
    queryKey: ["isRequestSent", authUserUid, profileOwnerEmail],
    queryFn: async () => {
      const check = await checkIfAFriendRequestWasAlreadySent(
        profileOwnerEmail,
        authUserUid
      );
      return check;
    },
  });
  return check;
};

export default useIsRequestSendAlready;
