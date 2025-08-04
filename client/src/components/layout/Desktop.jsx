import { useState } from "react";

import "./desktop.css";

// Components
import TaskBar from "./TaskBar";
import AppIcon from "../ui/AppIcon";
import WindowManager from "../windows/WindowManager";
import { useDispatch } from "react-redux";
import { openWindow } from "../../state/slices/windowSlice";

function Desktop() {
  const [wallpaper, setWallpaper] = useState(["/wallpapers/default.jpg"]);
  const dispatch = useDispatch();

  return (
    <>
      <div id="wallpaper">
        <img src={wallpaper} alt="" />
      </div>

      <div className="desktop-icons-container flex items-center">
        <AppIcon
          name="README.md"
          icon="/icons/readme.png" // you can use any icon you want here
          onDoubleClick={() =>
            dispatch(
              openWindow({
                appId: "readme",
                title: "README.md",
                position: { top: "35%", left: "30%" },
                size: { width: "45vw", height: "60vh" },
              })
            )
          }
        />
      </div>

      <TaskBar />
      <WindowManager />
    </>
  );
}

export default Desktop;
