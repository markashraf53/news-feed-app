import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useProfile } from "../../contexts/ProfileContext";
import AddNewButton from "../../ui/AddNewButton";
import EditListButton from "../../ui/EditListButton";
import HobbiesList from "./HobbiesList";
import { useParams } from "react-router-dom";

function UserHobbies() {
  const { userId } = useParams();
  const {
    hobbies,
    isAuth,
    profileOwnerDetails,
    isEditingHobbies,
    editedHobbies,
    isAddingHobby,
    hobbyToBeAdded,
    hobbiesDispatch: dispatch,
  } = useProfile();
  const hobbyInputRef = useRef();
  const { mutate } = useMutation({
    mutationFn: updateHobbies,
  });

  async function updateHobbies(array) {
    const docRef = doc(firestore, "users", userId);
    await updateDoc(docRef, { hobbies: array });
  }

  useEffect(() => {
    if (profileOwnerDetails?.hobbies) {
      dispatch({
        type: "hobbies/setHobbies",
        payload: profileOwnerDetails?.hobbies,
      });
    } else
      dispatch({
        type: "hobbies/setHobbies",
        payload: [],
      });
  }, [dispatch, profileOwnerDetails?.hobbies]);

  useEffect(() => {
    if (hobbies) {
      dispatch({ type: "hobbies/setEditedHobbies", payload: hobbies });
    }
  }, [hobbies, dispatch]);

  async function handleAddHobby() {
    dispatch({ type: "hobbies/setIsAddingHobby", payload: false });
    if (hobbyToBeAdded === "") {
      return;
    }

    let newHobbies = [...hobbies, hobbyToBeAdded];
    mutate(newHobbies);

    dispatch({ type: "hobbies/setHobbies", payload: newHobbies });

    dispatch({ type: "hobbies/setHobbyToBeAdded", payload: "" });
  }

  async function handleEditHobbies() {
    dispatch({ type: "hobbies/setIsEditingHobbies", payload: false });
    mutate(editedHobbies);

    dispatch({ type: "hobbies/setHobbies", payload: editedHobbies });
  }

  function handleAddHobbyInputChange(e) {
    dispatch({
      type: "hobbies/setHobbyToBeAdded",
      payload: e.target.value,
    });
  }

  function handleSetIsAddingHobby() {
    dispatch({
      type: "hobbies/setIsAddingHobby",
      payload: true,
    });
  }

  function handleSetIsEditingHobbies() {
    dispatch({
      type: "hobbies/setIsEditingHobbies",
      payload: true,
    });
  }

  function handleCancelEdit() {
    dispatch({ type: "hobbies/setIsEditingHobbies", payload: false });

    dispatch({ type: "hobbies/setEditedHobbies", payload: hobbies });
  }

  return (
    <>
      <p>Hobbies: </p>
      <div className="grid h-auto w-auto max-h-64 max-w-96 border rounded-lg p-2 border-slate-400/50 mt-1">
        <HobbiesList isAuth={isAuth} />
        {isAuth && (
          <div className="justify-self-center">
            <div className="flex gap-2 mt-2">
              {!isEditingHobbies && (
                <AddNewButton
                  isAdding={isAddingHobby}
                  dispatch={dispatch}
                  itemToBeAdded={hobbyToBeAdded}
                  inputRef={hobbyInputRef}
                  onAddItem={handleAddHobby}
                  onInputChange={handleAddHobbyInputChange}
                  setIsAdding={handleSetIsAddingHobby}
                >
                  hobby
                </AddNewButton>
              )}

              <EditListButton
                setIsEditingItems={handleSetIsEditingHobbies}
                items={hobbies}
                isEditingItems={isEditingHobbies}
                isAddingItem={isAddingHobby}
                handleEditItems={handleEditHobbies}
                handleCancelEdit={handleCancelEdit}
              >
                hobbies
              </EditListButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserHobbies;
