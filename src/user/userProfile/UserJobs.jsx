import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useProfile } from "../../contexts/ProfileContext";
import AddNewButton from "../../ui/AddNewButton";
import JobsList from "./JobsList";
import EditListButton from "../../ui/EditListButton";
import { useParams } from "react-router-dom";

function UserJobs() {
  const { userId } = useParams();
  const {
    jobs,
    isAuth,
    profileOwnerDetails,
    isEditingJobs,
    editedJobs,
    isAddingJob,
    jobToBeAdded,
    jobsDispatch: dispatch,
  } = useProfile();
  const jobInputRef = useRef();
  const { mutate } = useMutation({
    mutationFn: updateJobs,
  });

  async function updateJobs(array) {
    const docRef = doc(firestore, "users", userId);
    await updateDoc(docRef, { jobs: array });
  }

  useEffect(() => {
    if (profileOwnerDetails?.jobs) {
      dispatch({
        type: "jobs/setJobs",
        payload: profileOwnerDetails?.jobs,
      });
    } else
      dispatch({
        type: "jobs/setJobs",
        payload: [],
      });
  }, [profileOwnerDetails?.jobs, dispatch]);

  useEffect(() => {
    if (jobs) {
      dispatch({ type: "jobs/setEditedJobs", payload: jobs });
    }
  }, [jobs, dispatch]);

  async function handleAddJob() {
    dispatch({ type: "jobs/setIsAddingJob", payload: false });
    if (jobToBeAdded === "") {
      return;
    }

    let newJobs = [...jobs, jobToBeAdded];
    mutate(newJobs);

    dispatch({ type: "jobs/setJobs", payload: newJobs });

    dispatch({ type: "jobs/setJobToBeAdded", payload: "" });
  }

  function handleAddJobInputChange(e) {
    dispatch({
      type: "jobs/setJobToBeAdded",
      payload: e.target.value,
    });
  }

  function handleSetIsAddingJob() {
    dispatch({
      type: "jobs/setIsAddingJob",
      payload: true,
    });
  }

  function handleSetIsEditingJobs() {
    dispatch({
      type: "jobs/setIsEditingJobs",
      payload: true,
    });
  }

  async function handleEditJobs() {
    dispatch({ type: "jobs/setIsEditingJobs", payload: false });
    mutate(editedJobs);

    dispatch({ type: "jobs/setJobs", payload: editedJobs });
  }

  function handleCancelEdit() {
    dispatch({ type: "jobs/setIsEditingJobs", payload: false });

    dispatch({ type: "jobs/setEditedJobs", payload: jobs });
  }

  return (
    <>
      <p>Jobs: </p>
      <div className="grid h-auto w-auto max-h-64 max-w-96 border rounded-lg p-2 border-slate-400/50 mt-1">
        <JobsList isAuth={isAuth} />
        {isAuth && (
          <div className="justify-self-center">
            <div className="flex gap-2 mt-2">
              {!isEditingJobs && (
                <AddNewButton
                  isAdding={isAddingJob}
                  dispatch={dispatch}
                  itemToBeAdded={jobToBeAdded}
                  inputRef={jobInputRef}
                  onAddItem={handleAddJob}
                  onInputChange={handleAddJobInputChange}
                  setIsAdding={handleSetIsAddingJob}
                >
                  job
                </AddNewButton>
              )}

              <EditListButton
                setIsEditingItems={handleSetIsEditingJobs}
                items={jobs}
                isEditingItems={isEditingJobs}
                isAddingItem={isAddingJob}
                handleEditItems={handleEditJobs}
                handleCancelEdit={handleCancelEdit}
              >
                jobs
              </EditListButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserJobs;
