import { useReducer } from "react";

const initialState = {
  hobbies: [],
  isEditingHobbies: false,
  editedHobbies: [],
  isAddingHobby: false,
  hobbyToBeAdded: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "hobbies/setHobbies":
      return { ...state, hobbies: action.payload };
    case "hobbies/setEditedHobbies":
      return { ...state, editedHobbies: action.payload };
    case "hobbies/setIsEditingHobbies":
      return { ...state, isEditingHobbies: action.payload };
    case "hobbies/setHobbyToBeAdded":
      return { ...state, hobbyToBeAdded: action.payload };
    case "hobbies/setIsAddingHobby":
      return { ...state, isAddingHobby: action.payload };
    default:
      console.log("action type is Unknown");
  }
}

export function useHobbies() {
  const [
    { hobbies, isEditingHobbies, editedHobbies, isAddingHobby, hobbyToBeAdded },
    hobbiesDispatch,
  ] = useReducer(reducer, initialState);
  return [
    { hobbies, isEditingHobbies, editedHobbies, isAddingHobby, hobbyToBeAdded },
    hobbiesDispatch,
  ];
}
