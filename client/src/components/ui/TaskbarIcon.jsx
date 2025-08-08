import { useEffect, useRef } from "react";
import gsap from "gsap";

import "./taskbaricon.css";

import { File } from "react-bootstrap-icons";

import BootstrapIcon from "./BootstrapIcon";

import { useDispatch } from "react-redux";
import {
  setTaskbarAppFocus,
  setTaskbarAppUnFocus,
  setTaskbarAppOpen,
} from "../../state/slices/taskbarSlice";
import {
  openWindow,
  minimizeWindow,
  maximizeWindow,
  focusWindow,
} from "../../state/slices/windowSlice";

function TaskbarIcon(app) {
  const iconRef = useRef();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   gsap.fromTo(
  //     iconRef.current,
  //     // FROM state
  //     { y: 10, opacity: 0 },
  //     // TO state
  //     { y: 0, opacity: 1, duration: 0.3, delay: 0.2 }
  //   );
  // }, []);

  const handleClick = () => {
    if (app.isFocused) {
      dispatch(minimizeWindow(app.appId));
      dispatch(setTaskbarAppUnFocus(app.appId));
    } else {
      dispatch(maximizeWindow(app.appId));
      dispatch(setTaskbarAppFocus(app.appId));
      dispatch(focusWindow(app.appId));
    }
  };

  return (
    <button
      ref={iconRef}
      type="button"
      className={`taskbar-icon btn rounded-sm ${
        app.isOpen && "taskbar-icon-open"
      } ${app.isFocused && "taskbar-icon-focused"}`}
      onClick={handleClick}
    >
      {app.icon || app.bootstrapIcon ? (
        app.icon ? (
          <img src={app.icon} alt="" className="w-6 h-6 " />
        ) : (
          <BootstrapIcon icon={app.bootstrapIcon} size={24} />
        )
      ) : (
        <File size={24} />
      )}
    </button>
  );
}

export default TaskbarIcon;
