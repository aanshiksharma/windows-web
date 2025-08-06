import { Gear, FiletypeMd, Calculator, File } from "react-bootstrap-icons";

import "./appicon.css";

function AppIcon({ name, icon, bootstrapIcon, onDoubleClick }) {
  const BootstrapIcon = ({ icon, size }) => {
    switch (icon) {
      case "gear":
        return <Gear size={size} />;
      case "filetypeMd":
        return <FiletypeMd size={size} />;
      case "calculator":
        return <Calculator size={size} />;
      default:
        return <File size={size} />;
    }
  };

  return (
    <>
      <button
        className="icon-container p-2 flex flex-col items-center gap-2 rounded-md min-w-20"
        onDoubleClick={onDoubleClick}
      >
        <div className="icon w-12 h-full flex items-center justify-center">
          {icon ? (
            <img
              src={icon}
              alt={name}
              className="w-full h-full object-contain"
            />
          ) : (
            <BootstrapIcon icon={bootstrapIcon} size={38} />
          )}
        </div>
        <div className="label text-xs">{name}</div>
      </button>
    </>
  );
}

export default AppIcon;
