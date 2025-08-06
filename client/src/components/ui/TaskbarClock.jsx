import { useEffect, useState } from "react";
import gsap from "gsap";

function TaskbarClock() {
  const [timeAndDate, setTimeAndDate] = useState({ time: "", date: "" });

  useEffect(() => {
    const taskbarClockInterval = setInterval(() => {
      let now = new Date();

      let day = now.getDate();
      let month = now.getMonth();
      let year = now.getFullYear();

      let date = `${day < 10 ? "0" + day : day}-${
        month < 9 ? "0" + (month + 1) : month + 1
      }-${year}`;

      let hours = now.getHours();
      let minutes = now.getMinutes();

      let time = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;

      setTimeAndDate({ time: time, date: date });
    }, 1000);

    gsap.from("#taskbar-clock", {
      opacity: 0,
      y: 15,
      duration: 0.5,
      delay: 1,
    });

    return () => clearInterval(taskbarClockInterval);
  }, []);

  return (
    <div
      id="taskbar-clock"
      className="flex flex-col items-end justify-center text-xs py-1 px-2 rounded-sm cursor-default"
    >
      <p>{timeAndDate.time}</p>
      <p>{timeAndDate.date}</p>
    </div>
  );
}

export default TaskbarClock;
