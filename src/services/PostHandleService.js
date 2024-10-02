import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
  startAfter,
  limit,
  collectionGroup,
  where,
} from "@firebase/firestore";

export async function fetchPosts(uid) {
  const res = await getDocs(collection(firestore, "users", uid, "posts"));
  const posts = [];
  res.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });
  return posts;
}

export const addPost = async (post, uid) => {
  const data = await addDoc(collection(firestore, "users", uid, "posts"), post);
  return data;
};

export const getPostOwnerInfo = async (id) => {
  const postOwnerDoc = await getDoc(doc(firestore, "users", id));
  const postOwnerInfoRaw = await postOwnerDoc?._document.data.value.mapValue
    .fields;
  const postOwnerInfo = {
    displayName: postOwnerInfoRaw.displayName.stringValue,
    avatarUrl: postOwnerInfoRaw.avatarUrl.stringValue,
    email: postOwnerInfoRaw.email.stringValue,
  };
  return postOwnerInfo;
};

export const fetchPostsWithPaging = async (
  userId,
  postNumPerPage = 2,
  lastPostId = null
) => {
  const postCollectionRef = collection(firestore, "users", userId, "posts");
  let postsQuery = query(
    postCollectionRef,
    orderBy("timestamp", "desc"),
    limit(postNumPerPage)
  );
  if (lastPostId) {
    const lastPostDocSnap = await getDoc(doc(postCollectionRef, lastPostId));
    postsQuery = query(
      postCollectionRef,
      orderBy("timestamp", "desc"),
      startAfter(lastPostDocSnap),
      limit(postNumPerPage)
    );
  }

  const postsSnapshot = await getDocs(postsQuery);
  const posts = postsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return posts;
};

export async function getFriendsPosts(friendsList, pageParam = null) {
  if (friendsList.length === 0) return [];
  const friendsIds = friendsList?.map((friend) => friend.friendId);
  const friendsPosts = [];
  try {
    let postsQuery = query(
      collectionGroup(firestore, "posts"),
      orderBy("timestamp", "desc"),
      where("ownerId", "in", friendsIds),
      limit(3)
    );
    if (pageParam) {
      const lastPageQuery = query(
        collectionGroup(firestore, "posts"),
        orderBy("timestamp", "desc"),
        where("ownerId", "in", friendsIds),
        where("id", "==", pageParam)
      );
      const lastPostDoc = await getDocs(lastPageQuery);
      if (!lastPostDoc.docs[0]) return [];
      postsQuery = query(
        collectionGroup(firestore, "posts"),
        orderBy("timestamp", "desc"),
        where("ownerId", "in", friendsIds),
        limit(3),
        startAfter(lastPostDoc.docs[0])
      );
    }
    const postsSnapshot = await getDocs(postsQuery);
    postsSnapshot.forEach((doc) => {
      friendsPosts.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.log(e);
  }
  return friendsPosts;
}
