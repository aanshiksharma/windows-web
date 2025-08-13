import "./notification.css";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useDispatch } from "react-redux";
import { removeNotification } from "../../state/slices/notificationsSlice";

import { Bell, ExclamationTriangle, XLg } from "react-bootstrap-icons";

function NotificationPopup(notification) {
  const notifRef = useRef();
  const timeoutRef = useRef(null); // store timeout id
  const dispatch = useDispatch();

  const handleRemoveNotification = () => {
    // GSAP animation
    if (notifRef.current)
      gsap.to(notifRef.current, {
        opacity: 0,
        x: 200,
        duration: 0.5,
        onComplete: () => {
          dispatch(removeNotification(notification.id));
        },
      });

    clearTimeout(timeoutRef.current);
  };

  const startAutoRemoveTimer = () => {
    if (notification.type === "warning") {
      timeoutRef.current = setTimeout(handleRemoveNotification, 4000);
    }
  };

  const handlePresistNotification = () => {
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    startAutoRemoveTimer();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      ref={notifRef}
      className="notification-popup rounded-sm"
      onMouseEnter={handlePresistNotification}
      onMouseLeave={startAutoRemoveTimer}
    >
      {/* HEAD */}
      <div className="notification-header flex justify-between items-center px-2 py-2 border-b-1">
        <div className="text-sm font-semibold flex items-center gap-2">
          <Icon {...notification} />
          <span>{notification.head}</span>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="btn rounded-xs p-1 hover:bg-red-500 transition-all ease duration-100"
            onClick={() => dispatch(handleRemoveNotification)}
          >
            <XLg />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="notificaton-popup-body max-w-[40ch] px-2 py-3">
        <p className="text-sm">{notification.body}</p>
      </div>
    </div>
  );
}

function Icon(notification) {
  if (notification.type === "warning") return <ExclamationTriangle />;

  switch (notification.notifIcon) {
    case "exclamationTriangle":
      return <ExclamationTriangle />;
    default:
      return <Bell />;
  }
}

export default NotificationPopup;
