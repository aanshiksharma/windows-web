// System Apps
import ThisPC from "./systemApps/ThisPC";
import RecycleBin from "./systemApps/RecycleBin";

// Native Apps
import CalculatorApp from "./nativeApps/CalculatorApp";
import SettingsApp from "./nativeApps/SettingsApp";
import MicrosoftStoreApp from "./nativeApps/MicrosoftStoreApp";

// Admin Apps
import ReadmeApp from "./adminApps/ReadmeApp";

function AppRenderer({ appId }) {
  switch (appId) {
    // System Apps
    case "thispc":
      return <ThisPC />;

    case "recycleBin":
      return <RecycleBin />;

    // Native Apps
    case "calculator":
      return <CalculatorApp />;

    case "settings":
      return <SettingsApp />;

    case "microsoftStore":
      return <MicrosoftStoreApp />;

    // Admin Apps
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
