import { useEffect } from "react";
import { useSearchContext } from "../../../contexts/SearchContext";

const useClickOutsideSearchbarEffect = (searchbarRef) => {
  const { dispatch, searchTerm } = useSearchContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target)
      ) {
        dispatch({ type: "search/setShowResults", payload: false });
      } else if (
        searchbarRef.current &&
        searchbarRef.current.contains(event.target) &&
        searchTerm !== ""
      )
        dispatch({ type: "search/setShowResults", payload: true });
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchTerm, searchbarRef, dispatch]);
};

export default useClickOutsideSearchbarEffect;
