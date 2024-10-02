import { useEffect } from "react";

export default function useSetPostsEffect(userposts, friendsPosts, setPostsToView){
    useEffect(() => {
        if (userposts && !friendsPosts) {
          setPostsToView(userposts);
        } else if (friendsPosts && !userposts) {
          setPostsToView(friendsPosts);
        } else if (friendsPosts && userposts) {
          setPostsToView([...userposts, ...friendsPosts]);
        }
      }, [userposts, friendsPosts, setPostsToView]);
    
}