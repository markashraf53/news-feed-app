
import { usePostContext } from "../contexts/PostContext";

function PostImage() {
  const { imgUrl } = usePostContext();

  return (
    <div className="grid justify-items-center bg-none">
      <img className="max-h-full max-w-full" src={imgUrl}></img>
    </div>
  );
}

export default PostImage;
