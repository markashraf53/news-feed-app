import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInformation, signIn } from "../user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";

export default function useAuthUserID() {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        dispatch(signIn());
      } else {
        setUserId(null);
      }
    });
    return () => {
      listen();
    };
  }, [dispatch]);

  return userId;
}
