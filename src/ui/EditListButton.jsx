function EditListButton({
  children,
  items,
  setIsEditingItems,
  isEditingItems,
  isAddingItem,
  handleEditItems,
  handleCancelEdit,
}) {
  return (
    <div>
      {items?.length > 0 && !isEditingItems && !isAddingItem && (
        <>
          <button
            className="border border-slate-400/50 rounded-lg px-1"
            onClick={setIsEditingItems}
          >
            Edit {children}
          </button>
        </>
      )}
      {isEditingItems && (
        <div className="flex gap-2">
          <button className="" onClick={handleEditItems}>
            Done
          </button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default EditListButton;
