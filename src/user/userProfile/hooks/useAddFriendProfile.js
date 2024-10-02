import { useMutation } from "@tanstack/react-query";
import { friendRequestSendHandler } from "../../../services/FriendsService";

const useAddFriendProfile = (
  profileOwnerEmail,
  recipientId,
  authUserEmail,
  authUserId
) => {
  const { mutateAsync: addFriendMutate } = useMutation({
    mutationFn: () =>
      addFriend(profileOwnerEmail, recipientId, authUserEmail, authUserId),
  });
  return addFriendMutate;
};

async function addFriend(
  profileOwnerEmail,
  recipientId,
  authUserEmail,
  authUserId
) {
  friendRequestSendHandler(
    profileOwnerEmail,
    recipientId,
    authUserEmail,
    authUserId
  );
}

export default useAddFriendProfile;
