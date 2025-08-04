import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./login.css";

function Login() {
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("data")) || [];
  });

  const [settings, setSettings] = useState([]);

  const wallpaper = settings.wallpaper || "/wallpapers/default.jpg";

  return (
    <>
      <div className="wallpaper">
        <img src={wallpaper} alt="" />
      </div>
      <div className="underlay"></div>
      <div id="login-page">Login</div>
    </>
  );
}

export default Login;
