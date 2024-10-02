import { useSelector } from "react-redux";
import SearchBarUserDisplay from "./SearchBarUserDisplay";
import { getIsDarkMode } from "../darkModeSlice";
import { useSearchContext } from "../../contexts/SearchContext";

function SearchbarResults() {
  const isDarkMode = useSelector(getIsDarkMode);
  const { results, noMatchFound, dispatch } = useSearchContext();

  function handleChoice() {
    dispatch({ type: "search/setSearchTerm", payload: "" });
    dispatch({ type: "search/setResults", payload: [] });
  }

  return (
    <div
      className={`absolute w-52 border border-gray-300 mt-0.5 rounded shadow h-auto ml-3.5 animate__animated animate__fadeIn ${
        isDarkMode ? "bg-slate-500" : "bg-slate-100"
      }`}
    >
      {noMatchFound ? (
        <p className="px-3 py-2">No matches found.</p>
      ) : (
        results?.map((user, i) => (
          <SearchBarUserDisplay key={i} user={user} onClick={handleChoice} />
        ))
      )}
    </div>
  );
}

export default SearchbarResults;
