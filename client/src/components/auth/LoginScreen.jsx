import { useEffect, useState } from "react";

import "./loginscreen.css";

import gsap from "gsap";

// Components
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";

function LoginScreen({ authType }) {
  const currentUser = useSelector((state) => state.users.currentUser);

  let wallpaper = "/wallpapers/default.jpg";
  if (currentUser) wallpaper = currentUser.preferences.lockScreenWallpaper;

  return (
    <>
      <div className="wallpaper">
        <img
          src={wallpaper}
          alt=""
          className="w-screen h-screen object-cover"
        />
      </div>

      <div id="loginscreen-underlay" className="underlay"></div>

      {/* Conditional Rendering for login and signup forms */}
      {authType === "login" ? <LoginForm /> : <SignupForm />}
    </>
  );
}

export default LoginScreen;
