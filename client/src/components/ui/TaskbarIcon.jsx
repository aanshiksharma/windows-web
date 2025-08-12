import { useRef } from "react";
import gsap from "gsap";

import "./taskbaricon.css";

import { File } from "react-bootstrap-icons";

// Components
import BootstrapIcon from "./BootstrapIcon";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  openWindow,
  minimizeWindow,
  unMinimizeWindow,
} from "../../state/slices/windowSlice";
import { focusApp, openApp, unFocusApp } from "../../state/slices/taskbarSlice";

function TaskbarIcon({ appId }) {
  const iconRef = useRef();
  const dispatch = useDispatch();

  const apps = useSelector((state) => state.apps.apps);
  const app = apps.find((application) => application.appId === appId);

  const openApps = useSelector((state) => state.taskbar.openApps);
  const _openApp = openApps.find((openApp) => openApp.appId === appId);

  const open = _openApp && true;
  const focused = _openApp && _openApp.isFocused;

  const openWindows = useSelector((state) => state.window.openWindows);
  const currentAppWindows = openWindows.filter((win) => win.appId === appId);

  const handleClick = () => {
    if (open) {
      if (focused) {
        const currentFocusedWindows = currentAppWindows.filter(
          (win) => win.isFocused === true
        );

        if (currentFocusedWindows) {
          currentFocusedWindows.map((win) => {
            dispatch(unFocusApp(appId));
            dispatch(minimizeWindow(win.windowId));
          });
        }
      } else {
        const currentUnfocusedWindows = currentAppWindows.filter(
          (win) => win.isFocused === false
        );

        if (currentUnfocusedWindows) {
          currentUnfocusedWindows.map((win) => {
            dispatch(focusApp(appId));
            dispatch(unMinimizeWindow(win.windowId));
          });
        }
      }
    } else {
      dispatch(openWindow({ appId: appId, title: app.title }));
      dispatch(openApp(appId));
    }
  };

  return (
    <button
      ref={iconRef}
      type="button"
      className={`taskbar-icon btn rounded-sm ${open && "taskbar-icon-open"} ${
        focused && "taskbar-icon-focused"
      }`}
      onClick={handleClick}
    >
      {app.icon || app.bootstrapIcon ? (
        app.icon ? (
          <img src={app.icon} alt="" className="w-6 h-6" />
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
