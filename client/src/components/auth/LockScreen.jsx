import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import gsap from "gsap";

function LockScreen({ settings }) {
  const [timeAndDate, setTimeAndDate] = useState({ time: "", date: "" });

  const lockScreenRef = useRef();
  const lockScreenUIRef = useRef();

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.users.currentUser);

  let wallpaper = "/wallpapers/default.jpg";
  if (currentUser) wallpaper = currentUser.preferences.lockScreenWallpaper;

  useEffect(() => {
    lockScreenRef.current?.focus(); // focus on the #lock-screen div on mount to use keydown events with more control

    const interval = setInterval(() => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let now = new Date();

      let day = now.getDate();
      let dayIndex = now.getDay();
      let monthIndex = now.getMonth();

      let date = `${days[dayIndex]}, ${day} ${months[monthIndex]}`;

      let hours = now.getHours();
      let minutes = now.getMinutes();

      let time = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;

      setTimeAndDate({ time: time, date: date });
    }, 1000);

    gsap.to("#lockscreen-underlay", {
      opacity: 0,
      duration: 0.5,
      delay: 1,
    });

    gsap.from(lockScreenUIRef.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.5,
      delay: 1,
    });

    return () => clearInterval(interval);
  }, []);

  const handlePageChange = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    gsap.to("#lockscreen-underlay", {
      opacity: 1,
      duration: 0.5,
    });

    gsap.to(lockScreenUIRef.current, {
      y: -300,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        users.length == 0 ? navigate("/auth/signup") : navigate("/auth/login");
      },
    });
  };

  return (
    <>
      <div className="wallpaper">
        <img
          src={wallpaper}
          alt=""
          className="w-screen h-screen object-cover"
        />
      </div>

      <div id="lockscreen-underlay" className="underlay"></div>

      <div
        ref={lockScreenRef}
        id="lock-screen"
        className="flex items-start justify-center py-[17vh] h-screen text-[#f6f6f6]"
        onClick={handlePageChange}
        onKeyDown={handlePageChange}
        tabIndex={0} // to make this element focusable to use keydown events
      >
        <div
          ref={lockScreenUIRef}
          className="time-and-date select-none flex flex-col items-center justify-center font-semibold gap-2 cursor-default"
        >
          <p className="text-8xl">{timeAndDate.time}</p>
          <p className="text-lg">{timeAndDate.date}</p>
        </div>
      </div>
    </>
  );
}

export default LockScreen;
