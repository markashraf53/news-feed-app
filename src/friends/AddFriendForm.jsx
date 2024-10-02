import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthUserInfo } from "../user/userSlice";
import ErrorEl from "../ui/Error";
import useAddFriend from "./hooks/useAddFriend";

function AddFriendForm() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const recipientId = useRef("");
  const sender = useSelector(getAuthUserInfo);
  const [errorMsg, setErrorMsg] = useState(null);
  const isRequestSent = useRef(false);

  const addFriend = useAddFriend(
    isRequestSent,
    setRecipientEmail,
    recipientEmail,
    recipientId,
    sender,
    setErrorMsg
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (recipientEmail === "") {
      setErrorMsg("please enter a user's email");
      isRequestSent.current = false;
      return;
    }
    addFriend();
  }

  function handleSettingEmail(e) {
    setRecipientEmail(e.target.value);
    setErrorMsg(null);
    isRequestSent.current = false;
  }

  return (
    <div className="h-full m-10 grid justify-items-center">
      <div className="grid gap-3">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter user email"
            value={recipientEmail}
            onChange={handleSettingEmail}
            className="rounded-lg px-2 py-0.5 border border-slate-400/50 focus:outline-2 focus:outline-sky-500"
          ></input>
          <button>send request</button>
        </form>
        <div>
          {errorMsg?.length !== 0 && <ErrorEl msg={errorMsg} />}
          {isRequestSent.current && (
            <p className="text-green-400">{`Request sent.`}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddFriendForm;
