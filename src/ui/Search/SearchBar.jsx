import PropTypes from "prop-types";
import SearchInput from "./SearchInput";
import SearchbarResults from "./SearchbarResults";
import { useSearchContext } from "../../contexts/SearchContext";

SearchBar.propTypes = {
  className: PropTypes.string,
};

function SearchBar({ className }) {
  const { showResults } = useSearchContext();

  return (
    <div className={`${className} w-72`}>
      <SearchInput />
      {showResults && <SearchbarResults />}
    </div>
  );
}

export default SearchBar;