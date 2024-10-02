import { useProfile } from "../../contexts/ProfileContext";
import Hobby from "../userProfile/Hobby";

function HobbiesList({ isAuth }) {
  const { hobbies, isEditingHobbies, editedHobbies } = useProfile();

  return (
    <div className="flex flex-wrap place-content-center">
      {hobbies?.length > 0 ? (
        <>
          {isEditingHobbies
            ? editedHobbies.map((hobby, i) => (
                <Hobby hobby={hobby} key={i} i={i}></Hobby>
              ))
            : hobbies.map((hobby, i) => (
                <Hobby hobby={hobby} key={i} i={i}></Hobby>
              ))}
        </>
      ) : (
        <>{isAuth ? <p>Start Adding Items</p>: <p>{`User didn't add any hobbies`}</p>}</>
      )}
    </div>
  );
}

export default HobbiesList;
