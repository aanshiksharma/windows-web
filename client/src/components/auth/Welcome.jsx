import { useState, useEffect } from "react";

function Welcome() {
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
      <div id="welcome-screen">Welcome</div>
    </>
  );
}

export default Welcome;
