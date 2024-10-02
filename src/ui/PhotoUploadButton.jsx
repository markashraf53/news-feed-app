import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
PhotoUploadButton.propTypes = {
  onPhotoUpload: PropTypes.func,
  uploadImageRef: PropTypes.any,
  onSettingUploadedPicture: PropTypes.func,
  uploadedPicture: PropTypes.object,
  uploadedPicturePreview: PropTypes.any,
};

function PhotoUploadButton({
  onPhotoUpload,
  uploadImageRef,
  onSettingUploadedPicture,
  uploadedPicture,
  uploadedPicturePreview,
}) {
  return (
    <div className="flex overflow-hidden gap-3">
      <button
        title="Upload a photo"
        onClick={onPhotoUpload}
        className="text-blue-400/75 justify-self-end hover:text-blue-400 rounded-md w-5 h-5 text-xl ml-2 mt-2"
      >
        <FontAwesomeIcon icon={faImage} />
      </button>

      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        className="h-10"
        hidden
        ref={uploadImageRef}
        onChange={onSettingUploadedPicture}
      ></input>
      {uploadedPicture && uploadedPicturePreview && (
        <div className="flex items-center gap-2 mt-2">
          <img
            src={uploadedPicturePreview}
            className="w-8 h-8 object-cover"
          ></img>
          <p className="text-xs self-center max-w-64">{uploadedPicture.name}</p>
        </div>
      )}
    </div>
  );
}

export default PhotoUploadButton;
