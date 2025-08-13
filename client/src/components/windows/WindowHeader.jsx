import gsap from "gsap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { closeWindow, minimizeWindow } from "../../state/slices/windowSlice";
import { closeApp, unFocusApp } from "../../state/slices/taskbarSlice";

// Bootstrap Icons
import BootstrapIcon from "../ui/BootstrapIcon";
import {
  XLg,
  DashLg,
  WindowStack,
  WindowFullscreen,
} from "react-bootstrap-icons";

function WindowHeader({
  windowId,
  appId,
  title,
  fullScreen,
  handleFullScreen,
  windowRef,
}) {
  const dispatch = useDispatch();

  const apps = useSelector((state) => state.apps.apps);
  const app = apps.find((application) => {
    return application.appId === appId;
  });
  const icon = { bootstrapIcon: app.bootstrapIcon, icon: app.icon };

  const getRndElement = () => {
    const inst = windowRef?.current;
    if (!inst) return null;

    // react-rnd >= 10 exposes the actual node:
    if (typeof inst.getSelfElement === "function") {
      return inst.getSelfElement();
    }

    // Fallbacks for older versions (best-effort)
    return inst.resizable?.resizable || inst.dragElement || null;
  };

  const handleMinimize = () => {
    setTimeout(() => {
      dispatch(unFocusApp(appId));
      dispatch(minimizeWindow(windowId));
    }, 10);
  };

  const handleClose = () => {
    dispatch(closeApp(appId));
    dispatch(closeWindow(windowId));
  };

  return (
    <div className="window-header flex items-center justify-between">
      <div className="app-info flex items-center gap-2 px-4">
        {icon.icon ? (
          <div className="icon-container w-4 h-4 pointer-events-none">
            <img src={icon.icon} alt="" />
          </div>
        ) : (
          <BootstrapIcon icon={icon.bootstrapIcon} />
        )}
        <span className="text-sm">{title}</span>
      </div>

      <div className="buttons flex items-stretch">
        <button
          type="button"
          className="btn minimize-button px-4 py-3"
          onClick={handleMinimize}
        >
          <DashLg color="#e6e6e6" />
        </button>

        {fullScreen ? (
          <button
            type="button"
            className="btn restore-button px-4 py-3"
            onClick={handleFullScreen}
          >
            <WindowStack color="#e6e6e6" />
          </button>
        ) : (
          <button
            type="button"
            className="btn maximize-button px-4 py-3"
            onClick={handleFullScreen}
          >
            <WindowFullscreen color="#e6e6e6" />
          </button>
        )}

        <button
          type="button"
          className="btn close-button px-4 py-3 hover:bg-red-500"
          onClick={handleClose}
        >
          <XLg color="#e6e6e6" />
        </button>
      </div>
    </div>
  );
}

export default WindowHeader;
