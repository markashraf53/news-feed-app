import { useProfile } from "../../contexts/ProfileContext";
import Job from "./Job";

function JobsList({isAuth}) {
  const {
    jobs,
    isEditingJobs,
    editedJobs,
    jobDispatch: dispatch,
  } = useProfile();

  return (
    <div className="flex flex-wrap place-content-center">
      {jobs?.length > 0 ? (
        <>
          {isEditingJobs
            ? editedJobs.map((job, i) => (
                <Job
                  job={job}
                  key={i}
                  i={i}
                  isEditingJobs={isEditingJobs}
                  dispatch={dispatch}
                  editedHobbies={editedJobs}
                ></Job>
              ))
            : jobs.map((job, i) => (
                <Job
                  job={job}
                  key={i}
                  i={i}
                  isEditingJobs={isEditingJobs}
                  dispatch={dispatch}
                  jobs={jobs}
                ></Job>
              ))}
        </>
      ) : (
        <>{isAuth ? <p>Start Adding Items</p>: <p>{`User didn't add any jobs`}</p>}</>
      )}
    </div>
  );
}

export default JobsList;
