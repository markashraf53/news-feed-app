import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/UserProfileService";

export default function useGetUserDetails(userId) {
  const { data: userInfo, isLoading: isGetUserDetailsLoading } = useQuery({
    queryKey: ["getProfile", userId],
    queryFn: () => getUserDetails(userId),
  });

  return { userInfo, isGetUserDetailsLoading };
}
