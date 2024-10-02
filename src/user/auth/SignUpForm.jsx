import { useRef, useState } from "react";
import InputWithLabel from "../../ui/InputWithLabel";
import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signIn } from "../userSlice";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import Error from "../../ui/Error";
import { validate } from "react-email-validator";
import validator from "validator";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const username = useRef();
  const [usernameError, setUsernameError] = useState(null);

  const email = useRef();
  const [emailError, setEmailError] = useState(null);

  const password = useRef();
  const [passwordError, setPasswordError] = useState("");

  const confirmPassword = useRef();
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const age = useRef();
  const [ageError, setAgeError] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //password valitator function
  const validatePassword = (password) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setPasswordError(null);
    } else {
      setPasswordError("weak Password");
    }
  };

  function handleOnUsernameChange(e) {
    username.current = e.target.value;
    if (username.current.length < 4) {
      setUsernameError("username is too short!");
    } else setUsernameError(null);
  }

  function handleOnEmailChange(e) {
    email.current = e.target.value;
    if (!validate(email.current)) {
      setEmailError("Invalid Email format");
    } else setEmailError(null);
  }

  function handleOnPasswordChange(e) {
    password.current = e.target.value;
    validatePassword(password.current);
  }

  function handleOnConfirmPasswordChange(e) {
    confirmPassword.current = e.target.value;
    if (confirmPassword.current !== password.current) {
      setConfirmPasswordError("Passwords do not match!");
    } else setConfirmPasswordError(null);
  }
  function handleOnAgeChange(e) {
    e.target.value = Math.max(0, e.target.value);
    e.target.value = Math.min(100, e.target.value);
    age.current = e.target.value;
    if (age.current < 13) {
      setAgeError("Users must be over 12 years old");
    } else setAgeError(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      ageError
    ) {
      return;
    }
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      age === ""
    ) {
      return;
    }

    createUserWithEmailAndPassword(auth, email.current, password.current)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const newUser = {
          displayName: username.current,
          searchName: username.current.toLowerCase(),
          email: user.email,
          uid: user.uid,
          accessToken: user.accessToken,
          age,
          avatarUrl:
            "https://firebasestorage.googleapis.com/v0/b/social-feed-c8d94.appspot.com/o/avatar.png?alt=media&token=df8505b0-55a9-48ff-b525-fc72ea351e7c",
          bio: "",
          hobbies: [],
          jobs: [],
        };

        await setDoc(doc(firestore, "users", user.uid), newUser);
        dispatch(signIn());
        navigate(`/profile/${user.uid}`);
      })
      .catch((e) => console.log(e));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-9 justify-items-center content-center h-auto w-auto">
        <p className="text-3xl font-['Roboto'] font-semibold">Sign-up</p>
        <div className="grid justify-start gap-5 w-auto text-lg">
          <div className="grid">
            <InputWithLabel
              label="Username"
              type="text"
              value={username}
              onChange={handleOnUsernameChange}
              required={true}
            />
            {usernameError && <Error msg={usernameError} />}
          </div>

          <div className="grid">
            <InputWithLabel
              label="Email"
              type="email"
              value={email}
              onChange={handleOnEmailChange}
              required={true}
            />
            {emailError && <Error msg={emailError} />}
          </div>

          <div className="grid">
            <InputWithLabel
              label="Password"
              type="password"
              value={password}
              onChange={handleOnPasswordChange}
              required={true}
            />
            {passwordError && <Error msg={passwordError} />}
          </div>

          <div className="grid">
            <InputWithLabel
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleOnConfirmPasswordChange}
              required={true}
            />
            {confirmPasswordError && <Error msg={confirmPasswordError} />}
          </div>

          <div className="grid">
            <InputWithLabel
              label="Age"
              type="number"
              value={age}
              onChange={handleOnAgeChange}
              required={true}
            />
            {ageError && <Error msg={ageError} />}
          </div>

          <button className="grid place-self-end px-3 py-0.5 bg-blue-300 hover:bg-blue-400 rounded text-lg">
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
