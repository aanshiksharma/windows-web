import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";

import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../state/slices/usersSlice";

function SignupForm() {
  const [password, setPassword] = useState("");
  const signupErrorMessageRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    gsap.to(".wrapper", {
      opacity: 1,
      duration: 1,
    });
  }, []);

  const handlePasswordChange = (event) => {
    let numbers = "0123456789";
    let add = false;

    if (event.target.value === "") add = true;

    event.target.value.split("").forEach((letter) => {
      if (numbers.includes(letter)) add = true;
      else {
        add = false;
        return;
      }
    });

    add && setPassword(event.target.value);
  };

  const handleSignup = (form) => {
    let user = {
      name: form.signupName.value,
      username: form.signupUsername.value,
      password: form.signupPassword.value,
    };

    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].username === form.signupUsername.value) {
    //     signupErrorMessageRef.current.classList.remove("hidden");

    //     return;
    //   }
    // }

    const duplicateUser = users.find(
      (user) => user.username === form.signupUsername.value
    );

    if (duplicateUser) {
      signupErrorMessageRef.current.classList.remove("hidden");
      return;
    }

    dispatch(signupUser(user));

    // GSAP animation before naviagating to desktop come here
    gsap.to(".wrapper", {
      opacity: 0,
      y: -100,
      duration: 1,
      onComplete: navigate("/desktop"),
    });
  };

  const handleGuestLogin = () => {};

  return (
    <div id="signup-page" className="flex items-center justify-center h-screen">
      <div className="wrapper opacity-0 p-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-md">
          <h1 className="font-semibold text-2xl text-white my-4">
            Create an account!
          </h1>

          <form
            method="post"
            className="flex flex-col items-center justify-center gap-3 my-1"
            onSubmit={(event) => {
              event.preventDefault();
              handleSignup(event.target);
            }}
          >
            <input
              type="text"
              name="signupName"
              id="signup-name"
              placeholder="Full Name"
              required
              className="rounded-sm w-3xs outline-0 px-2 py-1"
              autoFocus
            />

            <p
              ref={signupErrorMessageRef}
              id="signupErrorMessage"
              className="opacity-80 text-xs hidden"
            >
              This username is taken. Choose another one.
            </p>

            <input
              type="text"
              name="signupUsername"
              id="signup-username"
              placeholder="Create username"
              required
              className="rounded-sm w-3xs outline-0 px-2 py-1"
              onChange={() => {
                if (!signupErrorMessageRef.current.classList.contains("hidden"))
                  signupErrorMessageRef.current.classList.add("hidden");
              }}
            />

            <input
              type="password"
              maxLength={4}
              minLength={4}
              value={password}
              onChange={handlePasswordChange}
              name="signupPassword"
              id="signup-password"
              placeholder="Create PIN"
              required
              className="rounded-sm w-3xs outline-0 px-2 py-1"
            />

            <button
              type="submit"
              className="btn outline-0 cursor-pointer rounded-md font-semibold text-sm px-3 py-1 mt-4"
            >
              Create Account
            </button>
          </form>

          <span>or</span>

          <a
            href="/desktop"
            className="text-sm font-semibold"
            onClick={handleGuestLogin}
          >
            Login as Guest
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
