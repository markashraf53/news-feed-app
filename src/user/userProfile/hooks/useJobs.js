import { useReducer } from "react";

const initialState = {
  jobs: [],
  editedJobs: [],
  isEditingJobs: false,
  jobToBeAdded: "",
  isAddingJob: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "jobs/setJobs":
      return { ...state, jobs: action.payload };
    case "jobs/setEditedJobs":
      return { ...state, editedJobs: action.payload };
    case "jobs/setIsEditingJobs":
      return { ...state, isEditingJobs: action.payload };
    case "jobs/setJobToBeAdded":
      return { ...state, jobToBeAdded: action.payload };
    case "jobs/setIsAddingJob":
      return { ...state, isAddingJob: action.payload };
    default:
      console.log("action type is Unknown");
  }
}

export function useJobs() {
  const [
    { jobs, isEditingJobs, editedJobs, isAddingJob, jobToBeAdded },
    jobsDispatch,
  ] = useReducer(reducer, initialState);
  return [
    { jobs, isEditingJobs, editedJobs, isAddingJob, jobToBeAdded },
    jobsDispatch,
  ];
}
