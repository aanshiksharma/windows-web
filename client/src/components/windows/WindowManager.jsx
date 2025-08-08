import { useSelector } from "react-redux";
import Window from "./Window";

function WindowManager() {
  const openWindows = useSelector((state) => state.window.openWindows);

  return (
    <>
      {openWindows.map((window) => {
        return <Window key={window.id} {...window} />;
      })}
    </>
  );
}

export default WindowManager;
