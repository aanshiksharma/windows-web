import ReadmeApp from "./ReadmeApp";
import CalculatorApp from "./CalculatorApp";
import SettingsApp from "./SettingsApp";

function AppRenderer({ appId }) {
  switch (appId) {
    case "readme":
      return <ReadmeApp />;
    case "calculator":
      return <CalculatorApp />;
    case "settings":
      return <SettingsApp />;
    default:
      return (
        <>
          <div className="">Unknown App : {appId}</div>
        </>
      );
  }
}

export default AppRenderer;
