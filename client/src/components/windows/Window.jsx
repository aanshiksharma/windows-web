import { useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { focusWindow } from "../../state/slices/windowSlice";
import { focusApp } from "../../state/slices/taskbarSlice";

// Components
import AppRenderer from "../apps/AppRenderer";
import WindowHeader from "./WindowHeader";

import "./window.css";

function Window(window) {
  const openWindows = useSelector((state) => state.window.openWindows);
  const currentWindow = openWindows.find(
    (win) => win.windowId === window.windowId
  );

  const [screenSize, setScreenSize] = useState({
    fullScreen: false,
    top: window.position.top,
    left: window.position.left,
    transform: window.transform,
    width: window.size.width,
    height: window.size.height,
  });

  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(focusWindow(window.windowId));
    dispatch(focusApp(window.appId));
  };

  const handleFullScreen = () => {
    setScreenSize((currSize) => {
      if (currSize.fullScreen)
        return {
          fullScreen: false,
          top: window.position.top,
          left: window.position.left,
          transform: window.transform,
          width: window.size.width,
          height: window.size.height,
        };
      else
        return {
          fullScreen: true,
          top: "0",
          left: "0",
          transform: "translate(0, 0)",
          width: "100vw",
          height: "calc(100vh - 3rem)",
        };
    });
  };

  return (
    <div
      className={`window shadow-2xs min-w-[500px] min-h-[400px] absolute overflow-hidden flex flex-col ${
        !screenSize.fullScreen && "rounded-lg"
      } ${currentWindow.isMinimized && "hidden"}`}
      onClick={handleFocus}
      style={{
        top: screenSize.top,
        left: screenSize.left,
        width: screenSize.width,
        height: screenSize.height,
        transform: screenSize.transform,
        zIndex: window.zIndex,
      }}
    >
      <WindowHeader
        {...window}
        fullScreen={screenSize.fullScreen}
        handleFullScreen={handleFullScreen}
      />

      <div className="window-body h-full overflow-y-auto">
        <AppRenderer appId={window.appId} />
      </div>
    </div>
  );
}

export default Window;
