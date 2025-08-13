import { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import gsap from "gsap";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { focusWindow } from "../../state/slices/windowSlice";
import { focusApp } from "../../state/slices/taskbarSlice";

// Components
import AppRenderer from "../apps/AppRenderer";
import WindowHeader from "./WindowHeader";

import "./window.css";

function Window({ windowId, appId, title, position, size, zIndex }) {
  const openWindows = useSelector((state) => state.window.openWindows);
  const currentWindow = openWindows.find((win) => win.windowId === windowId);

  const [screenSize, setScreenSize] = useState({
    fullScreen: false,
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height,
  });

  const rndRef = useRef(null);
  const lastScreenSize = useRef(screenSize);

  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(focusWindow(windowId));
    dispatch(focusApp(appId));
  };

  const handleFullScreen = () => {
    if (!screenSize.fullScreen) {
      lastScreenSize.current = { ...screenSize };

      gsap.to(screenSize, {
        duration: 0.25,
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - 48,
        onUpdate: () => {
          // Force React to re-render with updated state
          setScreenSize({ ...screenSize, fullScreen: true });
        },
        onComplete: () => {
          setScreenSize((s) => ({ ...s, fullScreen: true }));
        },
      });
    } else {
      gsap.to(screenSize, {
        duration: 0.25,
        ...lastScreenSize.current,
        onUpdate: () => {
          setScreenSize({ ...screenSize, fullScreen: false });
        },
        onComplete: () => {
          setScreenSize((s) => ({ ...s, fullScreen: false }));
        },
      });
    }
  };

  return (
    <Rnd
      ref={rndRef}
      // Position and Size Edge Cases (Bounds)

      bounds={false}
      minHeight={100}
      minWidth={500}
      // Size and Position

      size={{ width: screenSize.width, height: screenSize.height }}
      position={{ x: screenSize.x, y: screenSize.y }}
      // Part of the element that controls dragging

      dragHandleClassName="window-header"
      // Drag Handler

      onDragStop={(e, d) => {
        setScreenSize((s) => ({ ...s, x: d.x, y: Math.max(0, d.y) }));
      }}
      // Size Handler

      onResizeStop={(e, direction, ref, delta, pos) => {
        setScreenSize((s) => ({
          ...s,
          width: parseFloat(ref.style.width),
          height: parseFloat(ref.style.height),
          ...pos,
        }));
      }}
      // Enabling of Functionalities based on fullscreen mode

      disableDragging={screenSize.fullScreen}
      enableResizing={!screenSize.fullScreen}
      // Controlling zIndex manually for handling focus

      style={{
        zIndex: zIndex,
      }}
    >
      <div
        className={`window shadow-2xs w-full h-full overflow-hidden flex flex-col ${
          !screenSize.fullScreen && "rounded-lg"
        } ${
          currentWindow.isMinimized && "hidden"
        } transition-all duration-300 ease-in-out`}
        onClick={handleFocus}
      >
        <WindowHeader
          windowId={windowId}
          appId={appId}
          title={title}
          fullScreen={screenSize.fullScreen}
          handleFullScreen={handleFullScreen}
          windowRef={rndRef}
        />

        <div className="window-body h-full overflow-y-auto">
          <AppRenderer appId={appId} />
        </div>
      </div>
    </Rnd>
  );
}

export default Window;
