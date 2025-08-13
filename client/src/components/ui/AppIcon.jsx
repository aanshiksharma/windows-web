import "./appicon.css";

import BootstrapIcon from "./BootstrapIcon";

import { useDispatch, useSelector } from "react-redux";
import { openWindow } from "../../state/slices/windowSlice";
import { openApp } from "../../state/slices/taskbarSlice";
import { addNotification } from "../../state/slices/notificationsSlice";

function AppIcon(app) {
  const dispatch = useDispatch();
  const openApps = useSelector((state) => state.taskbar.openApps);

  const handleOpenWindow = () => {
    const openedApp = openApps.find((openApp) => openApp.appId === app.appId);

    if (openedApp) {
      if (openedApp.openWindowsCount <= 1 && app.allowMultipleInstances) {
        dispatch(openApp(app.appId));
        dispatch(openWindow({ ...app }));
      } else {
        dispatch(
          addNotification({
            type: "warning",
            head: "Multiple instances detected",
            body: "Only one instance of this app can run at a time!",
          })
        );
      }
    } else {
      dispatch(openApp(app.appId));
      dispatch(openWindow({ ...app }));
    }
  };

  return (
    <>
      <button
        className="icon-container p-2 flex flex-col items-center gap-2 rounded-md min-w-20"
        onDoubleClick={() => {
          handleOpenWindow(app);
        }}
      >
        <div className="icon w-12 h-full flex items-center justify-center">
          {app.icon ? (
            <img
              src={app.icon}
              alt={app.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <BootstrapIcon icon={app.bootstrapIcon} size={38} />
          )}
        </div>
        <div className="label text-xs">{app.title}</div>
      </button>
    </>
  );
}

export default AppIcon;
