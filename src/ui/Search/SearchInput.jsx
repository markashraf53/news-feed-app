import { useSelector } from "react-redux";
import { getIsDarkMode } from "../darkModeSlice";
import useClickOutsideSearchbarEffect from "./hooks/useClickOutsideSearchbarEffect";
import useSettingSearchResultsEffect from "./hooks/useSettingSearchResultsEffect";
import useSearchUsers from "./hooks/useSearchUsers";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { useSearchContext } from "../../contexts/SearchContext";
import { useRef } from "react";

function SearchInput() {
  const searchbarRef = useRef(null);
  const isDarkMode = useSelector(getIsDarkMode);
  const { dispatch, searchTerm } = useSearchContext();
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  const { searchResults } = useSearchUsers(debouncedSearchTerm);

  useSettingSearchResultsEffect(debouncedSearchTerm, searchResults);
  useClickOutsideSearchbarEffect(searchbarRef);

  function handleSearch(e) {
    dispatch({ type: "search/setSearchTerm", payload: e.target.value });
  }

  return (
    <input
      ref={searchbarRef}
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search Users"
      className={`w-60 h-10 py-1 px-4 rounded-full outline-none border border-slate-300/75 relative ${
        isDarkMode ? "bg-slate-500" : "bg-slate-100"
      }`}
    ></input>
  );
}

export default SearchInput;
