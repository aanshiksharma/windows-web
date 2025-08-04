import { useDispatch } from "react-redux";
import { openWindow } from "../../state/slices/windowSlice";
import { FiletypeMd } from "react-bootstrap-icons";

import "./appicon.css";

function AppIcon({ name, icon, onDoubleClick }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      openWindow({
        appId: "readme", // This must match your AppRenderer switch
        title: name,
        position: { top: "35%", left: "30%" },
        size: { width: "45vw", height: "60vh" },
      })
    );
  };

  return (
    <>
      <button
        className="icon-container flex flex-col items-center gap-2 rounded-md"
        onDoubleClick={onDoubleClick || handleClick}
      >
        <div className="icon">
          {/* <img src={app.icon} alt={app.name} /> */}
          <FiletypeMd size={40} />
        </div>
        <div className="label text-xs">{name}</div>
      </button>
    </>
  );
}

export default AppIcon;
