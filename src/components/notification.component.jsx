import React from "react";

const NotificationComponent = ({ message, notificationStatus }) => {
  return (
    <div
      className={`notification-component ${notificationStatus ? "active" : ""}`}
    >
      <i className="far fa-circle-check"></i>
      <div className="message">{message}</div>
    </div>
  );
};

export default NotificationComponent;
