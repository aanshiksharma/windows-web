import { useState } from "react";
import { useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

import { focusWindow } from "../../state/slices/windowSlice";
import AppRenderer from "../apps/AppRenderer";

import WindowHeader from "./WindowHeader";

import "./window.css";

function Window({ appId, title, size, position, transform }) {
  const [screenSize, setScreenSize] = useState({
    fullScreen: false,
    top: position.top,
    left: position.left,
    transform: transform,
    width: size.width,
    height: size.height,
  });

  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(focusWindow(appId));
  };

  const handleFullScreen = () => {
    setScreenSize((currSize) => {
      if (currSize.fullScreen)
        return {
          fullScreen: false,
          top: position.top,
          left: position.left,
          transform: transform,
          width: size.width,
          height: size.height,
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
      className={`window overflow-hidden flex flex-col ${
        screenSize.fullScreen ? "" : "rounded-lg"
      }`}
      onMouseDown={handleFocus}
      style={{
        top: screenSize.top,
        left: screenSize.left,
        width: screenSize.width,
        height: screenSize.height,
        transform: screenSize.transform,
      }}
    >
      <WindowHeader
        appId={appId}
        title={title}
        fullScreen={screenSize.fullScreen}
        handleFullScreen={handleFullScreen}
      />

      <div className="window-body overflow-y-auto">
        <AppRenderer appId={appId} />
      </div>
    </div>
  );
}

export default Window;
