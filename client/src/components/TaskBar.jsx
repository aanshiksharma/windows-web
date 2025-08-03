import "./taskbar.css";

function TaskBar() {
  return (
    <div id="taskbar" className="flex justify-center items-center">
      <div id="news-feed-container"></div>
      <div id="app-icons-container">
        <button type="button" className="btn" id="start-button">
          Start
        </button>
      </div>
      <div id="utility-tools-container"></div>
    </div>
  );
}

export default TaskBar;
