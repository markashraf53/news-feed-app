import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProfile } from "../../contexts/ProfileContext";

function UserAvatar() {
  const userInfo = useSelector(getAuthUserInfo);
  const { isAuth, profileOwnerDetails } = useProfile();
  const [imageUpload, setImageUpload] = useState(null);
  const imgUploadRef = useRef();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);

  const { mutateAsync } = useMutation({
    mutationFn: updateAvatarUrl,
    onError: () => {
      setIsUploadingAvatar(false);
      setImageUpload(null);
    },
    onSuccess: () => {
      setIsUploadingAvatar(false);
      setImageUpload(null);
      queryClient.invalidateQueries("getProfileInfo", "getUserPosts");
    },
  });

  async function updateAvatarUrl(avatarUrl) {
    const userDocRef = doc(firestore, "users", userInfo.uid);
    await updateDoc(userDocRef, { avatarUrl });
  }

  function handleAvatarUpload(e) {
    e.preventDefault();
    if (imageUpload === null) return;
    setIsUploadingAvatar(true);
    const imageRef = ref(storage, `avatars/${userInfo.email}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((avatarUrl) => {
        mutateAsync(avatarUrl);
      });
    });
  }

  const handleImageInput = (e) => {
    setImageUpload(e.target.files[0]);
    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleCancelUpdateAvatar = (e) => {
    e.preventDefault();
    setImagePreview(null);
    setImageUpload(null);
  };

  return (
    <div className="grid h-64 w-64 overflow-hidden">
      {!imagePreview ? (
        <img
          src={profileOwnerDetails?.avatarUrl}
          className="rounded-t-lg overflow-hidden"
          alt="Avatar"
          title="Avatar"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <img
          src={imagePreview}
          className="rounded-t-lg overflow-hidden"
          alt="Avatar"
          title="Avatar"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {isAuth && (
        <form onSubmit={handleAvatarUpload} className="grid gap-1 z-10">
          {isUploadingAvatar ? (
            <p className="h-7 bg-gray-800/75 hover:bg-gray-900 rounded-b-lg text-sm text-slate-200 flex justify-center gap-2 items-center">
              uploading Image...
            </p>
          ) : (
            <>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageInput}
                className="hidden"
                ref={imgUploadRef}
              ></input>
              <button
                className="h-7 z-10 bg-gray-800/75 hover:bg-gray-900 rounded-b-lg text-lg relative text-slate-300 flex justify-center gap-1.5"
                onClick={() => {
                  imgUploadRef.current.click();
                }}
              >
                <span>
                  <FontAwesomeIcon icon={faCamera} />
                </span>
                Update Avatar
              </button>
            </>
          )}
          {imageUpload && !isUploadingAvatar && (
            <div className="flex justify-center gap-2 mt-1">
              <button
                type="submit"
                className="bg-blue-300 rounded w-32 justify-self-center"
              >
                submit changes
              </button>
              <button
                onClick={handleCancelUpdateAvatar}
                className="bg-blue-300 rounded w-24 justify-self-center"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default UserAvatar;
