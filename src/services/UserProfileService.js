import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export async function getUserDetails(id) {
  const userDoc = await getDoc(doc(firestore, "users", id));
  const userInfoRaw = await userDoc?._document.data.value.mapValue.fields;
  const userInfo = {
    accessToken: userInfoRaw.accessToken.stringValue,
    uid: userInfoRaw.uid.stringValue,
    email: userInfoRaw.email.stringValue,
    displayName: userInfoRaw.displayName.stringValue,
    age: userInfoRaw.age.mapValue.fields.current.stringValue,
    bio: userInfoRaw.bio.stringValue,
    avatarUrl: userInfoRaw.avatarUrl.stringValue,
    hobbies: userInfoRaw.hobbies?.arrayValue?.values?.map(
      (hobby) => hobby.stringValue
    ),
    jobs: userInfoRaw.jobs?.arrayValue?.values?.map((job) => job.stringValue),
  };
  return userInfo;
}
