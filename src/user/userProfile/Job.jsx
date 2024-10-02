import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProfile } from "../../contexts/ProfileContext";

function Job({ job, i }) {
  const { jobsDispatch: dispatch, isEditingJobs, editedJobs } = useProfile();
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

  function handleRemoveJob() {
    dispatch({
      type: "jobs/setEditedJobs",
      payload: editedJobs.filter((_, index) => index !== i),
    });
  }

  return (
    <div className="mx-2 my-0.5">
      <p
        className={`flex border pt pb-0.5 px-1 rounded-lg ${colorRandomizer(
          i
        )} items-center justify-center`}
      >
        {job}{" "}
        {isEditingJobs && (
          <button className="mt-1 ml-1" onClick={handleRemoveJob}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </p>
    </div>
  );
}

export default Job;
