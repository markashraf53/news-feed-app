import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/UserProfileService";

export default function useGetRequestInfo(senderId) {
  const { data: senderInfo } = useQuery({
    queryKey: ["getRequestInfo", senderId],
    queryFn: () => getUserDetails(senderId),
  });
  return senderInfo;
}
