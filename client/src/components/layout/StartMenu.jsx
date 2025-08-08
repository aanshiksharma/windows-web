import {
  Person,
  Gear,
  Power,
  Search,
  ChevronRight,
} from "react-bootstrap-icons";
import "./startmenu.css";

// pinnedApps = [...app]
// app = {icon: "/icons/icon.png", label: "Example"}
function StartMenu({ visible, handleStartMenu }) {
  const pinnedApps = []; // { appId, title, icon, bootstrapIcon }

  return (
    <>
      <div
        className="startmenu-underlay"
        style={visible ? { display: "block" } : { display: "none" }}
        onClick={handleStartMenu}
      ></div>

      <div
        id="startmenu"
        className="rounded-md overflow-hidden"
        style={
          visible
            ? { transform: "translate(-50%, -3.75rem)" }
            : { transform: "translate(-50%, 100%)" }
        }
      >
        <div className="startmenu-top-container flex flex-col gap-10">
          <div className="searchbar-container">
            <div
              id="startmenu-searchbar"
              className="flex items-center justify-center gap-2 w-full rounded-full"
            >
              <Search />
              <input
                type="text"
                className="w-full font-normal"
                placeholder="Search for apps, settings, and documents"
              />
            </div>
          </div>

          <div className="pinned-apps">
            <div className="title-bar flex items-center justify-between">
              <span>Pinned</span>
              <button
                type="button"
                className="btn flex items-center justify-center gap-2 text-sm rounded-sm"
              >
                <span>All</span>
                <ChevronRight />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 items-center justify-center">
              {pinnedApps.length !== 0 ? (
                pinnedApps.map((app) => <Icon app={app} />)
              ) : (
                <p className="h-90 flex items-center">No apps pinned yet!</p>
              )}
            </div>
          </div>
        </div>

        <div className="bottombar flex items-center justify-between">
          <button
            type="button"
            className="btn account flex items-center gap-2 rounded-md"
          >
            <div className="profile rounded-full">
              <Person size={24} color="#e6e6e6" />
            </div>
            <span className="label text-sm">User</span>
          </button>
          <div className="buttons">
            <button type="button" className="btn rounded-md">
              <Gear size={20} />
            </button>
            <button type="button" className="btn rounded-md">
              <Power size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartMenu;
