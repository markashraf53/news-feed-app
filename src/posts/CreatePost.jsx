import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { getAuthUserInfo } from "../user/userSlice";
import SmallLoader from "../ui/SmallLoader";
import useCreatePost from "./hooks/useCreatePost";
import PhotoUploadButton from "../ui/PhotoUploadButton";
import InputTextArea from "../ui/InputTextArea";
import CustomButton from "../ui/CustomButton";
import PostingContainer from "./PostingContainer";
import { serverTimestamp } from "firebase/firestore";

function CreatePost() {
  const userInfo = useSelector(getAuthUserInfo);
  const [postContext, setPostContext] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [uploadedPicture, setUploadedPicture] = useState(null);
  const [uploadedPicturePreview, setUploadedPicturePreview] = useState(null);
  const uploadImageRef = useRef();

  const uploadPost = useCreatePost(
    uploadedPicture,
    setUploadedPicture,
    setPostContext,
    setIsPosting,
    userInfo?.uid
  );

  function handleContext(e) {
    setPostContext(e.target.value);
  }

  function handlePhotoUpload() {
    uploadImageRef.current.click();
  }

  function handlePost() {
    if (postContext === "" && !uploadedPicture) return;
    setIsPosting(true);
    const newPost = {
      ownerId: userInfo.uid,
      context: postContext,
      usersLiked: [],
      comments: [],
      timestamp: serverTimestamp(),
    };
    uploadPost(newPost);
  }

  function handleSetUploadedPicture(e) {
    const file = e.target.files[0];
    setUploadedPicture(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedPicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleCancel() {
    setPostContext("");
    setUploadedPicture(null)
    setUploadedPicturePreview(null)
  }

  return (
    <div>
      {isPosting ? (
        <PostingContainer>
          <SmallLoader>Posting</SmallLoader>
        </PostingContainer>
      ) : (
        <PostingContainer>
          <InputTextArea
            context={postContext}
            onSettingContext={handleContext}
          />
          <div className="flex justify-between">
            <PhotoUploadButton
              onSettingUploadedPicture={handleSetUploadedPicture}
              uploadImageRef={uploadImageRef}
              onPhotoUpload={handlePhotoUpload}
              uploadedPicture={uploadedPicture}
              uploadedPicturePreview={uploadedPicturePreview}
            />
            <div className="flex gap-2">
              {(uploadedPicture || postContext !== "") && (
                <CustomButton onClick={handleCancel}>Cancel</CustomButton>
              )}
              <CustomButton onClick={handlePost}>Post</CustomButton>
            </div>
          </div>
        </PostingContainer>
      )}
    </div>
  );
}

export default CreatePost;
