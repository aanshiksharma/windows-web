import { useDispatch } from "react-redux";
import { closeWindow } from "../../state/slices/windowSlice";

import {
  XLg,
  DashLg,
  WindowStack,
  WindowFullscreen,
  FiletypeMd,
} from "react-bootstrap-icons";

function WindowHeader({ appId, title, fullScreen, handleFullScreen }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeWindow(appId));
  };

  return (
    <div className="window-header flex items-center justify-between">
      <div className="app-info flex items-center gap-2">
        <FiletypeMd size={20} />
        <span className="text-sm">{title}</span>
      </div>
      <div className="buttons flex items-stretch">
        <button type="button" className="btn minimize-button">
          <DashLg color="#e6e6e6" />
        </button>

        {fullScreen ? (
          <button
            type="button"
            className="btn restore-button"
            onClick={handleFullScreen}
          >
            <WindowStack color="#e6e6e6" />
          </button>
        ) : (
          <button
            type="button"
            className="btn maximize-button"
            onClick={handleFullScreen}
          >
            <WindowFullscreen color="#e6e6e6" />
          </button>
        )}

        <button
          type="button"
          className="btn close-button hover:bg-red-500"
          onClick={handleClose}
        >
          <XLg color="#e6e6e6" />
        </button>
      </div>
    </div>
  );
}

export default WindowHeader;
