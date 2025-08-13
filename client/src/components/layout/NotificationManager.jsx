import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useSelector } from "react-redux";

import NotificationPopup from "../ui/NotificationPopup";

function NotificationManager() {
  const popupNotificationContainerRef = useRef();
  const popUpNotifications = useSelector(
    (state) => state.notifications.popUpNotifications
  );
  const prevLengthRef = useRef(popUpNotifications.length);

  useEffect(() => {
    let prevLength = prevLengthRef.current;
    let currLength = popUpNotifications.length;

    if (currLength > prevLength && popupNotificationContainerRef.current) {
      const items = popupNotificationContainerRef.current.children;

      if (items.length === 1)
        gsap.from(items[0], {
          y: items[0].clientHeight, // comes from above
          opacity: 0,
          duration: 0.5,
        });

      // Animate the newest notification (last one in array)
      if (items.length > 1) {
        const lastItem = items[items.length - 1];
        gsap.from(lastItem, {
          y: lastItem.clientHeight, // comes from above
          opacity: 0,
          duration: 0.5,
        });

        // Push down the older notifications
        gsap.from([...items].slice(0, -1), {
          y: (i, element) => element.clientHeight, // optional little push
          duration: 0.5,
        });
      }
    }

    prevLengthRef.current = currLength;
  }, [popUpNotifications]);

  return (
    <>
      {/* ============================ */}
      {/* POPUP NOTIFICATION CONTAINER */}
      {/* ============================ */}
      <div
        ref={popupNotificationContainerRef}
        id="popup-notification-container"
        className={`absolute right-0 bottom-0 h-full min-w-xs max-w-lg p-2 pb-14 ${
          popUpNotifications.length > 0 ? "flex" : "hidden"
        } flex-col gap-2 justify-end`}
      >
        {popUpNotifications.map((notification) => {
          switch (notification.type) {
            case "warning":
              return (
                <NotificationPopup key={notification.id} {...notification} />
              );
            default:
              return <NotificationPopup key={notification.id} />;
          }
        })}
      </div>
    </>
  );
}

export default NotificationManager;
