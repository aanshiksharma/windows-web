import { useEffect, useState } from "react";

import "./desktop.css";

// Components
import TaskBar from "./taskbar/TaskBar";
import AppIcon from "../ui/AppIcon";
import WindowManager from "../windows/WindowManager";

// States and Redux
import { useDispatch } from "react-redux";
import { openWindow } from "../../state/slices/windowSlice";

import apps from "../../state/json/apps.json";

// Animations
import gsap from "gsap";

function Desktop() {
  const [wallpaper, setWallpaper] = useState("/wallpapers/default.jpg");

  useEffect(() => {
    gsap.to(".starting-animation-overlay", {
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    });
  });

  return (
    <>
      <div className="starting-animation-overlay bg-black h-screen w-screen fixed inset-0 z-[2000] pointer-events-none"></div>

      <div id="wallpaper">
        <img
          src={wallpaper}
          alt=""
          className="w-screen h-screen object-cover"
        />
      </div>

      <div className="desktop-icons-container px-2 pt-2 pb-12 gap-y-3 gap-x-1 h-screen w-fit flex flex-col flex-wrap items-center justify-start">
        {apps.systemApps.map((app) => (
          <AppIcon key={app.id} {...app} />
        ))}
        {apps.nativeApps.map((app) => (
          <AppIcon key={app.id} {...app} />
        ))}
        {apps.adminApps.map((app) => (
          <AppIcon key={app.id} {...app} />
        ))}
      </div>

      <TaskBar />
      <WindowManager />
    </>
  );
}

export default Desktop;
