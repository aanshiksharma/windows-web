import "./appicon.css";

import BootstrapIcon from "./BootstrapIcon";

import { useDispatch } from "react-redux";
import { openWindow } from "../../state/slices/windowSlice";
import { addToPinnedApps } from "../../state/slices/taskbarSlice";

function AppIcon(app) {
  const dispatch = useDispatch();

  const handleOpenWindow = (app) => {
    dispatch(
      openWindow({
        ...app,
      })
    );

    dispatch(addToPinnedApps({ ...app, isFocused: true, isOpen: true }));
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
