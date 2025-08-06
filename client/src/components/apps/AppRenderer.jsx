import ReadmeApp from "./ReadmeApp";
import CalculatorApp from "./CalculatorApp";
import SettingsApp from "./SettingsApp";
import ThisPC from "./ThisPC";

function AppRenderer({ appId }) {
  switch (appId) {
    case "readme":
      return <ReadmeApp />;
    case "calculator":
      return <CalculatorApp />;
    case "settings":
      return <SettingsApp />;
    case "thispc":
      return <ThisPC />;
    default:
      return (
        <>
          <div className="">Unknown App : {appId}</div>
        </>
      );
  }
}

export default AppRenderer;
