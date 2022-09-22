import { useSelector } from "react-redux";

import {Alert} from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  console.log(notification)
  if (notification === undefined||notification === null) {
    return null;
  }

  const style = {
    color: notification.type === "alert" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  
  return (
    // <div id="notification" style={style}>
    //   {notification.message}
    // </div>
    <div id="notification">
      {(notification.message &&
      <Alert severity={notification.type}>
        {notification.message}
      </Alert>
      )}
    </div>
  );
};

export default Notification;
