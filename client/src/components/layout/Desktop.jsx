import { useEffect, useState } from "react";

import "./desktop.css";

// Components
import TaskBar from "./TaskBar";
import AppIcon from "../ui/AppIcon";
import WindowManager from "../windows/WindowManager";

// States and Redux
import { useDispatch, useSelector } from "react-redux";
import { unFocusAllApps } from "../../state/slices/taskbarSlice";

// Animations
import gsap from "gsap";
import { unFocusAllWindows } from "../../state/slices/windowSlice";

function Desktop() {
  const [wallpaper, setWallpaper] = useState("/wallpapers/default.jpg");
  const dispatch = useDispatch();

  const apps = useSelector((state) => state.apps.apps);
  const desktopApps = useSelector((state) => state.desktop.desktopApps);

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

      <div
        className="container w-screen h-screen"
        onClick={() => {
          dispatch(unFocusAllApps());
          dispatch(unFocusAllWindows());
        }}
      >
        <div className="desktop-icons-container px-2 pt-2 pb-12 gap-y-3 gap-x-1 h-full w-fit flex flex-col flex-wrap items-center justify-start">
          {apps.map((app) => {
            if (desktopApps.includes(app.appId))
              return <AppIcon key={app.appId} {...app} />;
          })}
        </div>
      </div>

      <TaskBar />
      <WindowManager />
    </>
  );
}

export default Desktop;
