import { useState } from "react";

import "./taskbar.css";

// Redux
import { useSelector } from "react-redux";

// Components
import StartMenu from "../StartMenu";
import TaskbarClock from "../../ui/TaskbarClock";
import TaskbarIcon from "../../ui/TaskbarIcon";

import { Collection, Microsoft, Search } from "react-bootstrap-icons";

function TaskBar() {
  const [startMenuVisibility, setStartMenuVisibility] = useState(false);

  // States from Redux
  const pinnedApps = useSelector((state) => state.taskbar.pinnedApps);

  const handleStartMenu = () => {
    setStartMenuVisibility(!startMenuVisibility);
  };

  return (
    <>
      <StartMenu
        visible={startMenuVisibility}
        handleStartMenu={handleStartMenu}
      />

      <div
        id="taskbar"
        className="flex justify-center relative items-center py-1 w-full px-3"
      >
        <div id="news-feed-container"></div>

        <div id="app-icons-container" className="flex items-center gap-1.5">
          <div className="default-icons flex items-center gap-1">
            <button
              type="button"
              className="btn rounded-sm"
              id="start-button"
              style={
                startMenuVisibility
                  ? { background: "hsl(0 0 100/0.1)" }
                  : { background: "transparent" }
              }
              onClick={handleStartMenu}
            >
              <div className="start-menu-button-container flex items-center justify-center rounded-[1.5px] overflow-hidden">
                <Microsoft size={24} />
              </div>
            </button>

            <div className="searchbar-container">
              <div
                id="taskbar-searchbar"
                className="flex items-center justify-center gap-3 px-[0.8rem] py-[0.4rem] w-full rounded-full cursor-text"
                onClick={() => {
                  document.querySelector("#taskbar-searchbar input").focus();
                }}
              >
                <Search size={16} />
                <input
                  type="text"
                  className="w-full min-w-41 text-sm font-normal border-0 outline-0"
                  placeholder="Search"
                />
              </div>
            </div>

            <button type="button" className="btn rounded-sm">
              <Collection size={24} />
            </button>
          </div>

          <div className="pinned-icons flex items-center gap-1">
            {pinnedApps.map((pinnedApp) => (
              <TaskbarIcon key={pinnedApp.id} {...pinnedApp} />
            ))}
          </div>
        </div>

        <div id="utility-tools-container" className="absolute right-3">
          <TaskbarClock />
        </div>
      </div>
    </>
  );
}

export default TaskBar;
