import { useEffect } from "react";
import { useSearchContext } from "../../../contexts/SearchContext";

const useSettingSearchResultsEffect = (debouncedSearchTerm, searchResults) => {
  const { dispatch } = useSearchContext();

  useEffect(() => {
    if (searchResults && searchResults?.length !== 0) {
      dispatch({ type: "search/setResults", payload: searchResults });
      dispatch({ type: "search/setShowResults", payload: true });
      dispatch({ type: "search/setNoMatchFound", payload: false });
    } else if (searchResults?.length === 0 && debouncedSearchTerm !== "") {
      dispatch({ type: "search/setResults", payload: [] });
      dispatch({ type: "search/setShowResults", payload: true });
      dispatch({ type: "search/setNoMatchFound", payload: true });
    } else {
      dispatch({ type: "search/setResults", payload: [] });
      dispatch({ type: "search/setShowResults", payload: false });
      dispatch({ type: "search/setNoMatchFound", payload: false });
    }
  }, [searchResults, debouncedSearchTerm, dispatch]);
};

export default useSettingSearchResultsEffect;
