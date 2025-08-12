// System Apps
import ThisPC from "./systemApps/ThisPC";
import Explorer from "./systemApps/Explorer";
import RecycleBin from "./systemApps/RecycleBin";
import ReadmeApp from "./systemApps/ReadmeApp";

// Default Apps
import CalculatorApp from "./defaultApps/CalculatorApp";
import SettingsApp from "./defaultApps/SettingsApp";
import MicrosoftStoreApp from "./defaultApps/MicrosoftStoreApp";

function AppRenderer({ appId }) {
  switch (appId) {
    // System Apps
    case "this-pc":
      return <ThisPC />;

    case "explorer":
      return <Explorer />;

    case "recycle-bin":
      return <RecycleBin />;

    // Default Apps
    case "calculator":
      return <CalculatorApp />;

    case "settings":
      return <SettingsApp />;

    case "microsoftStore":
      return <MicrosoftStoreApp />;

    // System Admin App
    case "readme":
      return <ReadmeApp />;

    default:
      return (
        <>
          <div className="flex items-center justify-center h-full font-semibold text-xl">
            Unknown App : {appId}
          </div>
        </>
      );
  }
}

export default AppRenderer;
