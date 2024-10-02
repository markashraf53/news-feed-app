import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function useCommenterInfo(commenterId) {
  const { data: commenterInfo } = useQuery({
    queryKey: [`getCommenterInfo-${commenterId}`],
    queryFn: () => fetchCommenterInfo(commenterId),
  });
  return commenterInfo;
}

async function fetchCommenterInfo(commenterId) {
  const userDocRef = doc(firestore, "users", commenterId);
  const userDoc = await getDoc(userDocRef);
  const userInfoRaw = await userDoc._document.data.value.mapValue.fields;
  const commenterInfo = {
    name: userInfoRaw.displayName.stringValue,
    avatarUrl: userInfoRaw.avatarUrl.stringValue,
  };
  return commenterInfo;
}
