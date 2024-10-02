import PropTypes from "prop-types";

AddNewButton.propTypes = {
  onInputChange: PropTypes.func,
  setIsAdding: PropTypes.func,
  isAdding: PropTypes.bool,
  itemToBeAdded: PropTypes.string,
  inputRef: PropTypes.any,
  onAddItem: PropTypes.func,
  children: PropTypes.any,
};

function AddNewButton({
  onInputChange,
  setIsAdding,
  isAdding,
  itemToBeAdded,
  inputRef,
  onAddItem,
  children,
}) {
  return (
    <div>
      {isAdding ? (
        <div className="flex gap-2 ml-1">
          <input
            ref={inputRef}
            value={itemToBeAdded}
            onChange={onInputChange}
            className="w-28 px-1 border border-slate-400/75 rounded-lg outline-green-500/75"
          ></input>
          <button
            onClick={onAddItem}
            className="border border-slate-400/50 rounded-lg px-1"
          >
            add
          </button>
        </div>
      ) : (
        <button
          onClick={setIsAdding}
          className="border border-slate-400/50 rounded-lg px-1"
        >
          add a {children}
        </button>
      )}
    </div>
  );
}

export default AddNewButton;
