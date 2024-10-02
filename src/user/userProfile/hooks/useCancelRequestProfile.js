import { useMutation } from "@tanstack/react-query";
import { onRejectRequest } from "../../../friends/hooks/useRejectFriendRequest";

const useCancelRequestProfile = (
  profileOwnerId,
  profileOwnerEmail,
  authUserId,
  authUserEmail
) => {
  const { mutateAsync: cancelFriendRequestMutate } = useMutation({
    mutationFn: () =>
      cancleFriendRequest(
        profileOwnerId,
        profileOwnerEmail,
        authUserId,
        authUserEmail
      ),
  });

  return cancelFriendRequestMutate;
};

function cancleFriendRequest(
  profileOwnerId,
  profileOwnerEmail,
  authUserId,
  authUserEmail
) {
  onRejectRequest(profileOwnerId, profileOwnerEmail, authUserId, authUserEmail);
}

export default useCancelRequestProfile;
