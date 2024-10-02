import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const searchContext = createContext();

const initialState = {
  searchTerm: "",
  results: [],
  showResults: false,
  noMatchFound: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "search/setSearchTerm":
      return { ...state, searchTerm: action.payload };
    case "search/setResults":
      return { ...state, results: action.payload };
    case "search/setShowResults":
      return { ...state, showResults: action.payload };
    case "search/setNoMatchFound":
      return { ...state, noMatchFound: action.payload };
    default:
      return;
  }
};

const SearchContextProvider = ({ children }) => {
  const [{ searchTerm, results, showResults, noMatchFound }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <searchContext.Provider
      value={{
        searchTerm,
        results,
        showResults,
        noMatchFound,
        dispatch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

SearchContextProvider.propTypes = {
  children: PropTypes.any,
};

const useSearchContext = () => {
  const context = useContext(searchContext);
  return context;
};

export { SearchContextProvider, useSearchContext };
