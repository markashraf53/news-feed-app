import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { firestore } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types"

UserBio.propTypes = {
  bio: PropTypes.string,
  isAuth: PropTypes.bool.isRequired
}

function UserBio({ bio, isAuth }) {
  const [bioText, setBioText] = useState("");
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const [isEditBio, setIsEditBio] = useState(false);
  const bioRef = useRef();
  const { mutate } = useMutation({
    mutationFn: updateBio,
    onSuccess: () => {
      queryClient.invalidateQueries("getProfile");
    },
  });

  async function updateBio(userBio) {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, { bio: userBio });
  }

  useEffect(() => {
    if (isEditBio && bioRef) {
      bioRef.current.focus();
    }
  }, [isEditBio]);

  useEffect(() => {
    if (bio?.length !== 0) {
      setBioText(bio);
    }
  }, [bio]);

  function handleSaveBio() {
    setIsEditBio(false);
    mutate(bioText);
  }

  return (
    <>
      {isAuth ? (
        <div className="grid border-2 border-slate-400/50 rounded-lg max-h-36 h-auto w-96">
          <textarea
            className="text-base m-2 p-1 resize-none h-full bg-inherit"
            disabled={!isEditBio}
            ref={bioRef}
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
          ></textarea>
          <div className="self-end justify-self-end flex gap-2 mr-2 mb-1">
            {isEditBio ? (
              <button
                onClick={handleSaveBio}
                className="rounded bg-blue-300 hover:bg-blue-400 px-1 grid place-content-center h-6 mt-3"
              >
                <p className="place-self-center mb-0.5">save</p>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditBio(true);
                  bioRef.current.focus();
                }}
                className="underline text-blue-400 hover:text-yellow-500"
              >
                Edit Bio
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid border-2 border-slate-400/50 rounded-lg max-h-36 h-auto w-96">
          <textarea
            className="text-base m-2 p-1 resize-none h-full bg-inherit"
            disabled
            value={bio}
          >
          </textarea>
        </div>
      )}
    </>
  );
}

export default UserBio;
