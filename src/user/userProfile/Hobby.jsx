import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProfile } from "../../contexts/ProfileContext";

function Hobby({ hobby, i}) {
  const {hobbiesDispatch: dispatch, isEditingHobbies, editedHobbies} = useProfile()
  function colorRandomizer(i) {
    let color = "";
    const randomNum = (i + 1) % 5;
    switch (randomNum) {
      case 0:
        color = "bg-red-400/50";
        break;
      case 1:
        color = "bg-blue-400/50";
        break;
      case 2:
        color = "bg-lime-400/50";
        break;
      case 3:
        color = "bg-yellow-400/50";
        break;
      case 4:
        color = "bg-slate-400/50";
        break;
    }
    return color;
  }

  function handleRemoveHobby() {
    /* setEditedHobbies(editedHobbies.filter((_, index) => index !== i)) */

    dispatch({
      type: "hobbies/setEditedHobbies",
      payload: editedHobbies.filter((_, index) => index !== i),
    });
  }

  return (
    <div className="mx-2 my-0.5">
      <p
        className={`flex border pt pb-0.5 px-1 rounded-lg ${colorRandomizer(
          i
        )} items-center justify-center`}
      >
        {hobby}{" "}
        {isEditingHobbies && (
          <button className="mt-1 ml-1" onClick={handleRemoveHobby}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </p>
    </div>
  );
}

export default Hobby;
