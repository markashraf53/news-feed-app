import CreatePost from "../posts/CreatePost";
import PostsFeed from "../posts/PostsFeed";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "../user/userSlice";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

function Home() {
  const isSignedIn = useSelector(getIsSignedIn);

  return (
    <>
      {isSignedIn ? (
        <div className="grid justify-items-center h-full">
          <CreatePost />
          <PostsFeed />
        </div>
      ) : (
        <div className="text-center h-screen flex justify-center mt-24">
          <div>
            <p className="text-3xl mb-2 font-bold">Welcome to social feed!</p>
            <div className="flex justify-center gap-4">
              <Link className="text-xl" to="/sign-in">
                <CustomButton>sign-in</CustomButton>
              </Link>
              <Link className="text-xl" to="/sign-up">
                <CustomButton>Register</CustomButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
