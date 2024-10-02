import { useRef, useState } from "react";
import InputWithLabel from "../../ui/InputWithLabel";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Error from "../../ui/Error";
import { useDispatch } from "react-redux";
import { signIn } from "../userSlice";
import { NavLink, useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef("");
  const [loginError, setLoginError] = useState(null);

  const password = useRef("");

  function handleOnEmailChange(e) {
    setLoginError(null);
    email.current = e.target.value;
  }
  function handleOnPasswordChange(e) {
    setLoginError(null);
    password.current = e.target.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoginError(null);
    signInWithEmailAndPassword(auth, email.current, password.current)
      .then(async (userCredential) => {
        const user = userCredential.user;
        dispatch(signIn());
        navigate("/");
        return user
      })
      .catch((e) => {
        setLoginError("Invalid Email or password!");
        console.log(e.message);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-9 justify-items-center content-center h-auto w-auto">
        <p className="text-3xl font-['Roboto'] font-semibold">Sign-in</p>
        <div className="grid justify-start gap-5 w-auto text-lg">
          <div>
            <InputWithLabel
              label="Email"
              type="email"
              value={email}
              onChange={handleOnEmailChange}
              required={true}
            />
          </div>

          <div>
            <InputWithLabel
              label="Password"
              type="password"
              value={password}
              onChange={handleOnPasswordChange}
              required={true}
            />
          </div>

          {loginError && <Error msg={loginError} />}
          <div className="flex justify-end gap-6">
            <NavLink className="underline self-end" to="/sign-up">sign up?</NavLink>
            <button className="grid place-self-end px-3 py-0.5 bg-blue-300 hover:bg-blue-400 rounded text-lg">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignInForm;
