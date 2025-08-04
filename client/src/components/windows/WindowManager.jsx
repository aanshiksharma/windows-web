import { useSelector, useDispatch } from "react-redux";
import { closeWindow, focusWindow } from "../../state/slices/windowSlice";
import Window from "./Window";

function WindowManager() {
  const openWindows = useSelector((state) => state.window.openWindows);
  const dispatch = useDispatch();

  return (
    <>
      {openWindows.map((window) => (
        <Window
          key={window.id}
          {...window}
          onClose={() => {
            dispatch(closeWindow(window.id));
          }}
          onFocus={() => {
            dispatch(focusWindow(window.id));
          }}
        />
      ))}
    </>
  );
}

export default WindowManager;
