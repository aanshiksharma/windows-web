import {
  Person,
  Gear,
  Power,
  Search,
  ChevronRight,
} from "react-bootstrap-icons";

import "./startmenu.css";

import BootstrapIcon from "../ui/BootstrapIcon";

import { useDispatch, useSelector } from "react-redux";
import { openWindow } from "../../state/slices/windowSlice";
import { openApp } from "../../state/slices/taskbarSlice";
import { addNotification } from "../../state/slices/notificationsSlice";

// START MENU ICON COMPONENT
function Icon(app) {
  const dispatch = useDispatch();
  const openApps = useSelector((state) => state.taskbar.openApps);

  const handleOpenWindow = () => {
    app.handleStartMenu();
    const openedApp = openApps.find((openApp) => openApp.appId === app.appId);
    if (openedApp) {
      if (app.allowMultipleInstances) {
        dispatch(openApp(app.appId));
        dispatch(openWindow({ ...app }));
      } else {
        if (openedApp.openWindowsCount === 0) {
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
      }
    } else {
      dispatch(openApp(app.appId));
      dispatch(openWindow({ appId: app.appId, title: app.title }));
    }
  };

  return (
    <>
      <button
        className="icon-container pt-3 pb-5 px-2 flex flex-col items-center gap-1 rounded-md"
        onClick={() => {
          handleOpenWindow(app);
        }}
      >
        <div className="icon w-8 h-full flex items-center justify-center">
          {app.icon ? (
            <img
              src={app.icon}
              alt={app.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <BootstrapIcon icon={app.bootstrapIcon} size={32} />
          )}
        </div>
        <div className="label text-xs">{app.title}</div>
      </button>
    </>
  );
}

function StartMenu({ visible, handleStartMenu }) {
  const user = useSelector((state) => state.users.currentUser);
  const apps = useSelector((state) => state.apps.apps);

  const pinnedApps = user.layout.startMenuPinnedApps;
  const openApps = useSelector((state) => state.taskbar.openApps);

  const dispatch = useDispatch();

  const handleOpenWindow = (appId, title) => {
    handleStartMenu();
    const openedApp = openApps.find((openApp) => openApp.appId === appId);
    if (openedApp) {
      dispatch(
        addNotification({
          type: "warning",
          head: "Multiple instances detected",
          body: "Only one instance of this app can run at a time!",
        })
      );
    } else {
      dispatch(openApp(appId));
      dispatch(openWindow({ appId: appId, title: title }));
    }
  };

  return (
    <>
      <div
        className="startmenu-underlay"
        style={visible ? { display: "block" } : { display: "none" }}
        onClick={handleStartMenu}
      ></div>

      <div
        id="startmenu"
        className="rounded-md absolute bottom-0 left-[50%] overflow-hidden min-w-160 w-2xl"
        style={
          visible
            ? { transform: "translate(-50%, -3.75rem)" }
            : { transform: "translate(-50%, 100%)" }
        }
      >
        <div className="startmenu-top-container px-10 py-8 flex flex-col gap-10">
          <div className="searchbar-container">
            <div
              id="startmenu-searchbar"
              className="flex items-center justify-center gap-2 px-4 py-1 w-full rounded-full"
            >
              <Search />
              <input
                type="text"
                className="w-full font-normal border-0 outline-0"
                placeholder="Search for apps, settings, and documents"
              />
            </div>
          </div>

          <div className="pinned-apps space-y-4">
            <div className="title-bar px-8 flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Pinned</span>
              <button
                type="button"
                className="btn px-2 py-1 flex items-center justify-center gap-2 text-xs rounded-sm"
              >
                <span>All</span>
                <ChevronRight />
              </button>
            </div>

            <div className="container h-[56vh]">
              <div className="grid grid-cols-6 gap-0 h-fit">
                {pinnedApps.length !== 0 ? (
                  apps.map((app) => {
                    if (pinnedApps.includes(app.appId))
                      return (
                        <Icon
                          key={app.appId}
                          {...app}
                          handleStartMenu={handleStartMenu}
                        />
                      );
                  })
                ) : (
                  <p className="h-90 flex items-center">No apps pinned yet!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bottombar flex items-center justify-between px-16 py-2.5">
          <button
            type="button"
            className="btn px-4 py-1.25 account flex items-center gap-2 rounded-md"
          >
            <div className="profile p-1 rounded-full">
              <Person size={24} color="#e6e6e6" />
            </div>
            <span className="label text-xs">{user.name}</span>
          </button>

          <div className="buttons">
            <button type="button" className="btn p-3 rounded-md">
              <Gear
                size={18}
                onClick={() => {
                  handleOpenWindow("settings", "Settings");
                }}
              />
            </button>
            <button type="button" className="btn p-3 rounded-md">
              <Power size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartMenu;
