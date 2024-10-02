import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase";

const useSearchUsers = (debouncedSearchTerm) => {
  const { data: searchResults } = useQuery({
    queryKey: ["searchUsers", debouncedSearchTerm],
    queryFn: () => searchUsers(debouncedSearchTerm),
  });

  return { searchResults };
};

async function searchUsers(searchTerm) {
  let searchResults = [];
  if (searchTerm === "") return searchResults;
  try {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const usersCollectionRef = collection(firestore, "users");
    const searchQuery = query(
      usersCollectionRef,
      where("searchName", ">=", searchTermLowerCase),
      where("searchName", "<=", searchTermLowerCase + "\uf8ff")
    );
    const querySnapshot = await getDocs(searchQuery);
    searchResults = querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {
    console.log(e);
  }
  return searchResults;
}

export default useSearchUsers;
