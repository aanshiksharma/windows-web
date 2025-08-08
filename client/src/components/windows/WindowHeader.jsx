// Redux
import { useDispatch } from "react-redux";
import { closeWindow, minimizeWindow } from "../../state/slices/windowSlice";
import {
  removeFromPinnedApps,
  setTaskbarAppUnFocus,
} from "../../state/slices/taskbarSlice";

// Bootstrap Icons
import BootstrapIcon from "../ui/BootstrapIcon";
import {
  XLg,
  DashLg,
  WindowStack,
  WindowFullscreen,
} from "react-bootstrap-icons";

function WindowHeader({
  appId,
  title,
  fullScreen,
  handleFullScreen,
  icon,
  bootstrapIcon,
}) {
  const dispatch = useDispatch();

  const handleMinimize = () => {
    dispatch(minimizeWindow(appId));
    dispatch(setTaskbarAppUnFocus(appId));
  };

  const handleClose = () => {
    dispatch(removeFromPinnedApps(appId));
    dispatch(closeWindow(appId));
  };

  return (
    <div className="window-header flex items-center justify-between">
      <div className="app-info flex items-center gap-2 px-4">
        {icon ? (
          <div className="icon-container w-4 h-4 pointer-events-none">
            <img src={icon} alt="" />
          </div>
        ) : (
          <BootstrapIcon icon={bootstrapIcon} />
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
