import { useState, useEffect } from "react";

import "./desktop.css";

// Components
import TaskBar from "../components/TaskBar";

function Desktop() {
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("data")) || [];
  });

  const [settings, setSettings] = useState([]);
  const wallpaper = settings.wallpaper || "/wallpapers/default.jpg";

  return (
    <>
      <div id="wallpaper">
        <img src={wallpaper} alt="" />
      </div>
      <TaskBar />
    </>
  );
}

export default Desktop;
