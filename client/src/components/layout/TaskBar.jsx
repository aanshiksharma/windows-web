import { useState } from "react";
import { Collection, Microsoft, Search } from "react-bootstrap-icons";

import "./taskbar.css";

import StartMenu from "./StartMenu";

function TaskBar() {
  const [startMenuVisibility, setStartMenuVisibility] = useState(false);

  const handleStartMenu = () => {
    setStartMenuVisibility(!startMenuVisibility);
  };

  return (
    <>
      <StartMenu
        visible={startMenuVisibility}
        handleStartMenu={handleStartMenu}
        pinnedApps={[]}
      />
      <div id="taskbar" className="flex justify-center items-center py-1">
        <div id="news-feed-container"></div>

        <div id="app-icons-container" className="flex items-center">
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
              <Microsoft size={24} />
            </button>

            <div className="searchbar-container">
              <div
                id="taskbar-searchbar"
                className="flex items-center justify-center gap-3 w-full rounded-full"
              >
                <Search size={16} />
                <input
                  type="text"
                  className="w-full text-sm font-normal"
                  placeholder="Search"
                />
              </div>
            </div>

            <button type="button" className="btn rounded-sm">
              <Collection size={24} />
            </button>
          </div>

          <div className="pinned-icons flex items-center gap-2"></div>
        </div>
        <div id="utility-tools-container"></div>
      </div>
    </>
  );
}

export default TaskBar;
